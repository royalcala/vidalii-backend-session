import { api, Context, orm } from "@vidalii/backend";

//TODO can be installed or all imported, decide what

@api.ObjectType()
@orm.Entity()
export class Version {
    @api.Field()
    @orm.Property()
    _id_doc: String

    @api.Field()
    @orm.Property()
    id_user_created: String

    @api.Field()
    @orm.Property()
    date_created: number

    @api.Field()
    @orm.Property()
    id_user_updated: String

    @api.Field()
    @orm.Property()
    date_updated: number

    static persist(_id_doc: String, id_user_created: String, context: Context) {
        const version = new this()
        // version._id_doc =
        context.em.persist(version)        
    }
}


