import { VidaliiService } from "@vidalii/backend"
import { ContextSession } from "./auth.context.api"

const AuthFn = (groups: string[]) => next => async (root, args, context: ContextSession) => {
    const found = context.session.groups.find((group) => {
        const found = groups.find(
            groupN => groupN === group
        )
        return found
    })
    if (found === undefined)
        throw new Error(`You dont have authorization.`)
}

export const Auth = {
    Query: (groups: string[]) => (target: any, keyMethod: string) => {
        VidaliiService.api.addResolversComposition(`Query.${keyMethod}`, [AuthFn(groups)], 'before')
    },
    Mutation: (groups: string[]) => (target: any, keyMethod: string) => {
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