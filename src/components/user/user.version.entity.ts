import { api, orm } from "@vidalii/backend"
import { Version } from "../version/version.entity";

@api.ObjectType()
@orm.Entity()
export class UserVersion extends Version {}