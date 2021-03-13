import { api, Context, orm } from "@vidalii/backend";

//TODO can be installed or all imported, decide what

@api.ObjectType()
export class Version {
    @api.Field()
    @orm.PrimaryKey()
    _id_doc: String

    @api.Field()
    @orm.Property()
    id_user_created?: String

    @api.Field()
    @orm.Property()
    date_created?: number

    @api.Field()
    @orm.Property()
    id_user_updated?: String

    @api.Field()
    @orm.Property()
    date_updated?: number

    static insert(_id_doc: String, id_user_created: String, context: Context) {
        const version = new this()
        version._id_doc = _id_doc
        version.id_user_created = id_user_created
        context.em.persist(version)
    }
    static update(_id_doc: String, id_cuser_udpated: String, context: Context) {
        
    }
}


