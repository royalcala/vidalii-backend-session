import { orm, api, val, ObjectId } from "@vidalii/backend";



@orm.Entity()
export class session {
    prePersist_login(id_user) {
        this._id = new ObjectId().toHexString()
        this.id_user = id_user
        this.time_login = new Date().getTime()
        return this
    }
    // prePersist_logout(_id_user) {
    //     this.id_user = _id_user
    //     this.time_logout = new Date().getTime()
    // }
    @orm.PrimaryKey()
    _id: string

    @orm.Index()
    @orm.Property()
    id_user?: string

    @orm.Property()
    time_login?: number

    // @orm.Property()
    // time_logout?: number

}