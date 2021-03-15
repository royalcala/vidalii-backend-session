import { api, Context, val } from "@vidalii/backend";
import { User } from "../user/user.api";
import { user as UserEntity } from "../user/user.entity";
import { session as SessionEntity } from "./session.entity";
import { verifyPassword } from "../user/user.password";
import jwt from "jsonwebtoken";
import { SECRET, TOKEN } from "./context.api";


@api.ObjectType()
export class Session implements Partial<SessionEntity>{
    @api.Field(type => String)
    _id: string;

    @api.Field(type => String)
    id_user: string

    @api.Field(type => Number)
    time_login: number

    @api.Field(type => Number)
    time_logout: number

    @api.Field(type => String)
    token: string
}

@api.InputType()
export class CredentialInput {

    @api.Field({ nullable: false })
    @val.IsEmail()
    email: string

    @api.Field({ nullable: false })
    password: string
}

@api.Resolver(of => Session)
export class SessionResolvers {

    @api.Mutation(returns => User)
    async SessionLogin(
        @api.Arg('credential', { validate: true }) credential: CredentialInput,
        @api.Ctx() context: Context
    ) {
        const user = await context.em.findOneOrFail(UserEntity, { email: credential.email })

        const passwordCorrect = await verifyPassword(credential.password, user.password)
        if (passwordCorrect === false)
            throw new Error(`Password incorrect`)

        const sessionEntity = new SessionEntity().login(user._id)
        context.em.persist(sessionEntity)
        //@ts-ignore
        user.token = jwt.sign(
            {
                _id_user: user._id
            } as TOKEN,
            SECRET,
            { expiresIn: '1d' }
        )

        return user

    }

    @api.Mutation(returns => Session)
    SessionLogout(
        @api.Arg('session_id', () => String) session: string,
        @api.Ctx() context: Context
    ) {
        // const session = await context.em.

    }
}