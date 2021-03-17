import { api, Context, orm, val, getDataLoader, VidaliiService } from "@vidalii/backend";
import { user as UserEntity } from "./user.entity";
import { UserVersion } from "./user.version.entity";
import { JsonScalar } from "@vidalii/backend/dist/scalars/Json";

@api.ObjectType()
export class User implements Partial<UserEntity>{
    @api.Field(type => String)
    _id: string;

    @api.Field()
    name: string;

    @api.Field()
    lastname: string

    @api.Field()
    email: string;

    @api.Field()
    phone: string

    @api.Field(type => UserVersion, { nullable: true })
    async version(
        @api.Ctx() context: Context
    ) {
        const userVersion = getDataLoader(UserVersion, 'User.version', '_id_doc', context)
        return userVersion.load(this._id)
    }
}


@api.InputType()
export class UserUpdate{

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: true })
    name: string

    @val.IsEmail({}, { message: 'your email is incorrect' })
    @api.Field({ nullable: true })
    email: string


    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: true })
    lastname: string

    @val.IsPhoneNumber('MX', { message: `Your phone number is incorrect` })
    @api.Field({ nullable: true })
    phone: string
}

@api.Resolver(of => User)
export class UserResolver {
    @api.Query(returns => [User])
    async userFind(
        @api.Arg('operators', () => JsonScalar)
        operators: Object,
        @api.Ctx() context: Context
    ) {

        return context.em.find(UserEntity, operators)
    }
    @api.Mutation(returns => User)
    async userInsert(
        @api.Arg("user", { validate: true }) user: UserEntity,
        @api.Ctx() context: Context
    ) {
        await user.pre_persist()
        context.em.persist(user)
        return user
    }

    @api.Mutation(returns => User)    
    async userUpdate(
        @api.Arg("_id") _id: string,
        @api.Arg("user", { validate: true }) userUpdate: UserUpdate,
        @api.Ctx() context: Context
    ) {
        const prevData = await context.em.findOne(UserEntity, _id)
        if (prevData === null)
            throw new Error(`The _id:${_id}, doesnt exist on database`)
        const newOne = orm.wrap(prevData).assign(userUpdate)
        return newOne
    }
}