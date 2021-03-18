import { api, Context, getDataLoader, ObjectId, orm } from "@vidalii/backend"
import { Groups } from "./group.enum.api"
// import { User } from "./user.api";

// @api.ObjectType()
// @orm.Entity()
// export class group {
//     @api.Field()
//     @orm.PrimaryKey()
//     @orm.Property()
//     name: string
// }


@orm.Entity()
export class usergroup {
    @orm.PrimaryKey()    
    id_user: string

    @orm.Property({ type: orm.JsonType })
    group: Groups[]
}

