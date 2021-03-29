import { VidaliiService } from "@vidalii/backend"
import { ContextSession } from "./session.context.api"
import { Groups } from "../group/group.enum.api"
export { Groups }
const AuthFn = (groups: string[]) => next => async (root, args, context: ContextSession, info) => {
    const found = context.session.groups.find((group) => {
        const found = groups.find(
            groupN => groupN === group
        )
        return found
    })
    if (found === undefined)
        throw new Error(`You dont have authorization.`)
    return next(root, args, context, info)
}

export const Auth = {
    Query: (groups: Groups[]) => (target: any, keyMethod: string) => {
        VidaliiService.api.addResolversComposition(`Query.${keyMethod}`, [AuthFn(groups)], 'before')
    },
    Mutation: (groups: Groups[]) => (target: any, keyMethod: string) => {
        VidaliiService.api.addResolversComposition(`Mutation.${keyMethod}`, [AuthFn(groups)], 'before')
    }
}

// export const Auth = (groups: string[]): api.MiddlewareFn<ContextSession> => async ({ context }, next) => {
//     const found = context.session.groups.find((group) => {
//         const found = groups.find(
//             groupN => groupN === group
//         )
//         return found
//     })
//     if (found === undefined)
//         throw new Error(`You dont have authorization.`)

//     await next()
// }