import { orm, api, val, ObjectId } from "@vidalii/backend";


@api.InputType('UserInsert')
@orm.Entity()
export class user {
    @orm.PrimaryKey()
    _id: String = new ObjectId().toHexString()

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: false })
    @orm.Property()
    name: String

    @api.Field({ nullable: false })
    @orm.Property()
    lastname: String

    @val.IsEmail({}, { message: 'your email is incorrect' })
    @api.Field({ nullable: false })
    @orm.Property()
    email: String

    @val.IsPhoneNumber('MX', { message: `Your phone number is incorrect` })
    @api.Field({ nullable: false })
    @orm.Property()
    phone: String
}