import { api, Context, orm, val } from "@vidalii/backend";
import { session as SessionEntity } from "./session.entity";


@api.ObjectType()
export class Session implements Partial<SessionEntity>{
    @api.Field(type => String)
    _id: String;

    @api.Field()
    name: String;

    @api.Field()
    lastname: String

    @api.Field()
    email: String;

    @api.Field()
    phone: String
}
