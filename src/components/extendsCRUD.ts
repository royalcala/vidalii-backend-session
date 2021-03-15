import { api, Context } from "@vidalii/backend";
import { JsonScalar } from "@vidalii/backend/dist/scalars/Json";

export function createBaseResolverFind(prefix: string, ReturnType, EntityToFind) {
    @api.Resolver({ isAbstract: true })
    abstract class BaseResolver {
        @api.Query(type => [ReturnType], { name: `${prefix}Find` })
        async prefixFind(
            @api.Arg('operators', () => JsonScalar)
            operators: Object,
            @api.Ctx() context: Context
        ) {

            return context.em.find(EntityToFind, operators)
        }
    }

    return BaseResolver;
}

export function createBaseResolverInsert<TInputType extends api.ClassType>(
    // prefix: string,
    ReturnType: api.ClassType,
    nameArg: string,
    InputAndEntityType: TInputType,
    fnPersist: (persist: () => {}, arg: TInputType, context: Context) => any
) {
    @api.Resolver({ isAbstract: true })
    abstract class BaseResolver {
        @api.Mutation(returns => ReturnType, { name: `${ReturnType.name}Insert` })
        async [`${ReturnType.name}Insert`](
            @api.Arg(nameArg, () => InputAndEntityType, { validate: true }) arg,
            @api.Ctx() context: Context
        ) {
            return fnPersist(
                () => context.em.persist(arg),
                arg,
                context
            )

            //TODO id_session_HERE
            // UserVersion.insert(user._id, 'id_session_HERE', context)
        }
    }

    return BaseResolver;
}