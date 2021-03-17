import { api, Context, getDataLoader, ObjectId, orm } from "@vidalii/backend"
import { User } from "./user.api";

@api.ObjectType()
@orm.Entity()
export class group {
    pre_persist() {
        this._id = new ObjectId().toHexString()
        return this
    }
    @api.Field()
    @orm.PrimaryKey()
    _id: string

    @api.Field()
    @orm.Unique()
    @orm.Property()
    name: string
}


@orm.Entity()
export class usergroup {
    pre_persist() {
        this._id = new ObjectId().toHexString()
        return this
    }
    @orm.PrimaryKey()
    _id: string

    @orm.Property()
    @orm.Index()
    id_user: string

    @orm.Property()
    @orm.Index()
    id_group: string
}

