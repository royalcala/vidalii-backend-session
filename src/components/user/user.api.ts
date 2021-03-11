import { api, Context } from "@vidalii/backend";
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

@api.Resolver(User)
class BookResolver {
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
}