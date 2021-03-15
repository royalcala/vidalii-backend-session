import { api, Context, orm, val, getDataLoader, VidaliiService } from "@vidalii/backend";
import { user as UserEntity } from "./user.entity";
import { UserVersion } from "./user.version.entity";
import { createBaseResolverFind, createBaseResolverInsert } from "../extendsCRUD";
import { useMiddlewareExtends } from "../useMiddlewareExtends";


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
export class UserUpdate implements Omit<UserEntity, '_id'>{

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: true })
    name: String

    @val.IsEmail({}, { message: 'your email is incorrect' })
    @api.Field({ nullable: true })
    email: String


    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: true })
    lastname: String

    @val.IsPhoneNumber('MX', { message: `Your phone number is incorrect` })
    @api.Field({ nullable: true })
    phone: String
}



@api.Resolver(of => User)
class UserFind extends createBaseResolverFind('User', User, UserEntity) { }

@api.Resolver(of => User)
class UserInsert extends createBaseResolverInsert(
    User, 'user', UserEntity,
    (persist, userInput) => {
        persist()
        //TODO create middleware in separate file for add version insert1   
        return userInput
    }
) { }
VidaliiService.api.addResolversComposition('Mutation.UserInsert', [next => async (root, args, context: Context, info) => {
    const user = new UserEntity()
    UserVersion.insert(user._id, 'id_session_HERE', context)
    return next(root, args, context, info)
}])

// const UserVersionInsert: api.MiddlewareFn<Context> = ({ args, context, info }, next) => {
//     console.log('helllllllllllllllllllllllloww**********************')
//     const user = args as UserEntity
//     UserVersion.insert(user._id, 'id_session_HERE', context)
//     return next();
// };


// useMiddlewareExtends(UserInsert, [UserVersionInsert])


@api.Resolver(of => User)
export class UserResolver {
    // @api.Query(returns => [UseUserVersion.insert(user._id, 'id_session_HERE', context)r])
    // async UserFind(
    //     @api.Arg('operators', () => JsonScalar)
    //     operators: Object,
    //     @api.Ctx() context: Context
    // ) {

    //     return context.em.find(UserEntity, operators)
    // }
    // @api.Mutation(returns => User)
    // async UserInsert(
    //     @api.Arg("user", { validate: true }) user: UserEntity,
    //     @api.Ctx() context: Context
    // ) {
    //     context.em.persist(user)
    //     //TODO id_session_HERE
    //     UserVersion.insert(user._id, 'id_session_HERE', context)
    //     return user
    // }

    @api.Mutation(returns => User)
    async UserUpdate(
        @api.Arg("_id") _id: String,
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