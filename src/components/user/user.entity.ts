import { orm, api, val, ObjectId } from "@vidalii/backend";
import { hash } from "./user.password.lib";


@api.InputType('UserInsert')
@orm.Entity()
export class user {
    async pre_persist() {
        this._id = new ObjectId().toHexString()
        this.password = await hash(this.password)
        return this
    }
    @orm.PrimaryKey()
    _id: string

    @val.MaxLength(20, {
        message: 'the max size is 20.',
    })
    @api.Field({ nullable: false })
    @orm.Property()
    name: string

    @val.MaxLength(20, {
        message: 'the max size is 20.',
    })
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

    @api.Field({ nullable: false })
    @orm.Property()
    password: string    
}