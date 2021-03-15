import { api } from "@vidalii/backend"


export function useMiddlewareExtends<T extends Function>(
    Extends: T,
    //fieldName: Extract<keyof T['prototype'], string>,
    middlewares: api.MiddlewareFn[]) {

    let found = api.getMetadataStorage().middlewares.find(m => m.target === Extends)    
    if (!found)
        api.UseMiddleware(middlewares)(Extends.prototype, Extends.name)
    // api.UseMiddleware(middlewares)(Extends.prototype, fieldName)
    else
        found.middlewares.push(...middlewares)

    console.log('middlewares::****************::::', api.getMetadataStorage().middlewares)

    console.log('api.getMetadataStorage()', api.getMetadataStorage().mutations)
}