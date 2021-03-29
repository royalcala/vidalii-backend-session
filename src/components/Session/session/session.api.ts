import { api, Context, val } from "@vidalii/backend";
import { User } from "../user/user.api";
import { user as UserEntity } from "../user/user.entity";
import { session as SessionEntity } from "./session.entity";
import { verifyPassword } from "../user/user.password.lib";
import jwt from "jsonwebtoken";
import { SECRET, TOKEN } from "./session.context.api";
import { usergroup } from "../group/group.entity";


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


@api.Resolver(of => Session)
export class SessionResolvers {

    @api.Mutation(returns => String)
    async sessionLogin(
        @api.Arg('username') email: string,
        @api.Arg('password') password: string,
        @api.Ctx() context: Context
    ) {
        const user = await context.em.findOne(UserEntity, { email })
        if (!user)
            throw new Error(`Credentials incorrect.`)

        const passwordCorrect = await verifyPassword(password, user.password)
        if (passwordCorrect === false)
            throw new Error(`Credentials incorrect..`)

        const groups = (await context.em.findOne(usergroup, { id_user: user._id })).group
        const sessionEntity = new SessionEntity().prePersist_login(user._id)
        context.em.persist(sessionEntity)

        const token = 'Bearer ' + jwt.sign(
            {
                _id_user: user._id,
                groups,
            } as TOKEN,
            SECRET,
            { expiresIn: '1d' }
        )

        return token

    }

    // @api.Mutation(returns => Session)
    // sessionLogout(
    //     @api.Arg('session_id', () => String) id_user: string,
    //     @api.Ctx() context: Context
    // ) {
    //     //TODO destroy token on client
    //     new SessionEntity().prePersist_logout()

    // }
}