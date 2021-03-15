import { api, Context, orm, val } from "@vidalii/backend";
import { session as SessionEntity } from "./session.entity";


@api.ObjectType()
export class Session implements Partial<SessionEntity>{
    @api.Field(type => String)
    _id: string;

    @api.Field(type => String)
    id_user: string

    time_login: number

    time_logout: number
}
