import { VidaliiService } from "@vidalii/backend";
import { user as UserEntity } from "./user.entity";
import { group } from "./user.group.entity";

VidaliiService.db.addDbInit(
    async orm => {
        const g1 = new group()
        g1.name = "admin"
        g1.pre_persist()

        const g2 = new group()
        g2.name = "guest"
        g2.pre_persist()

        await orm.em.persist([g1, g2])

        const user = new UserEntity()
        user.name = "admin"
        user.lastname = "admin"
        user.password = "admin"
        user.email = "admin@vidalii.com"
        user.phone = "4491862098"
        user.pre_persist()
        orm.em.persist(user)

        await orm.em.flush()

    })