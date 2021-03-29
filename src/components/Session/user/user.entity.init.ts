import { VidaliiService } from "@vidalii/backend";
import { user as UserEntity } from "./user.entity";
import { usergroup } from "../group/group.entity";
import { Groups } from "../group/group.enum.api";

VidaliiService.db.addDbInit(
    async orm => {
        // const g1 = new group()
        // g1.name = "admin"
        // g1.pre_persist()

        // const g2 = new group()
        // g2.name = "user"
        // g2.pre_persist()

        // const g3 = new group()
        // g3.name = GUEST
        // g3.pre_persist()

        // await orm.em.persist([g1, g2,g3])

        const user = new UserEntity()
        user.name = "admin"
        user.lastname = "admin"
        user.password = "admin"
        user.email = "admin@vidalii.com"
        user.phone = "4491862098"
        user.pre_persist()
        orm.em.persist(user)

        const ug = new usergroup()
        ug.group = [Groups.admin]
        ug.id_user = user._id
        orm.em.persist(ug)

        await orm.em.flush()

    })