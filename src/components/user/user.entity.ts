import { orm, api, val, ObjectId } from "@vidalii/backend";


@api.InputType('UserInsert')
@orm.Entity()
export class user {
    @orm.PrimaryKey()
    _id: string = new ObjectId().toHexString()

    @val.MaxLength(20, {
        message: 'name is too big',
    })
    @api.Field({ nullable: false })
    @orm.Property()
    name: string

    @api.Field({ nullable: false })
    @orm.Property()
    lastname: string

    @val.IsEmail({}, { message: 'your email is incorrect' })
    @api.Field({ nullable: false })
    @orm.Property()
    email: string

    @val.IsPhoneNumber('MX', { message: `Your phone number is incorrect` })
    @api.Field({ nullable: false })
    @orm.Property()
    phone: string

    // @val.IsHash()
    @api.Field({ nullable: false })
    @orm.Property()
    password: string
}