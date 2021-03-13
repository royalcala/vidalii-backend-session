import { orm, api, val, ObjectId } from "@vidalii/backend";


@api.InputType('SessionInsert')
@orm.Entity()
export class session {
    @orm.PrimaryKey()
    _id: String = new ObjectId().toHexString()

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field()
    @orm.Property()
    name: String
}