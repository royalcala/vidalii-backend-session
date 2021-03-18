import { api } from "@vidalii/backend";

export enum Groups {
    admin = "admin",
    user = "user",
    guest = "guest"
}


api.registerEnumType(Groups, {
    name: "Groups", // this one is mandatory
    description: "Access Control by Groups", // this one is optional
});