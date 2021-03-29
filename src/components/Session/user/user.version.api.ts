import { VidaliiService, Context, api, getDataLoader } from "@vidalii/backend"
import { UserVersion } from "./user.version.entity"
import { user as UserEntity } from "./user.entity";
import { User } from "./user.api";

const resolverUserVersionInsert = next => async (root, args, context: Context, info) => {
    const user = await next(root, args, context, info) as UserEntity
    UserVersion.insert(user._id, 'id_session_HERE', context)
    //@ts-ignore
    user.version = UserVersion
    return user
}

VidaliiService.api.addResolversComposition('Mutation.UserInsert', [resolverUserVersionInsert])

@api.Resolver(of => User)
export class UserVersionResolver {
    @api.FieldResolver(returnType => UserVersion)    
    async version(
        @api.Root() user: User,
        @api.Ctx() context: Context
    ) {
        const userVersion = getDataLoader(UserVersion, 'User.version', '_id_doc', context)
        return userVersion.load(user._id)
    }
}