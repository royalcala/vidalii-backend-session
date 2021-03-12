import { api, Context, orm } from "@vidalii/backend";
import { user as UserEntity } from "./user.entity";


@api.ObjectType()
export class User implements Partial<UserEntity>{
    @api.Field(type => String)
    _id: String;

    @api.Field()
    name: String;

    @api.Field()
    lastname: String

    @api.Field()
    email: String;

    @api.Field()
    phone: String
}

@api.InputType()
export class UserUpdate implements Omit<UserEntity, '_id'>{
    @api.Field({ nullable: true })
    name: String

    @api.Field({ nullable: true })
    email: String

    @api.Field({ nullable: true })
    lastname: String

    @api.Field({ nullable: true })
    phone: String
}

@api.Resolver(User)
export class UserResolver {
    @api.Query(returns => [User])
    async UserFind(
        @api.Ctx() context: Context
    ) {
        return context.em.find(UserEntity, {})
    }
    @api.Mutation(returns => User)
    async UserInsert(
        @api.Arg("user") user: UserEntity,
        @api.Ctx() context: Context
    ) {
        context.em.persist(user)
        return user
    }

    @api.Mutation(returns => User)
    async UserUpdate(
        @api.Arg("_id") _id: String,
        @api.Arg("user") userUpdate: UserUpdate,
        @api.Ctx() context: Context
    ) {
        console.log(_id, userUpdate)
        const prevData = await context.em.findOne(UserEntity, _id)
        if (prevData === null)
            throw new Error(`The _id:${_id}, doesnt exist on database`)
        const newOne = orm.wrap(prevData).assign(userUpdate)
        return newOne
    }
}