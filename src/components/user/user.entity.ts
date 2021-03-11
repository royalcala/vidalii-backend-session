import { orm, api, val, ObjectId } from "@vidalii/backend";


@api.InputType()
@orm.Entity()
export class user {
    @orm.PrimaryKey()
    _id: String = new ObjectId().toHexString()

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field()
    @orm.Property()
    name: String

    @api.Field()
    @orm.Property()
    lastname: String

    @val.IsEmail({}, { message: 'your email is incorrect' })
    @orm.Property()
    email: String


    @val.IsPhoneNumber('MX', { message: `Your phone number is incorrect` })
    @orm.Property()
    phone: String
}