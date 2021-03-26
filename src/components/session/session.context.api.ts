import { Context, VidaliiService } from "@vidalii/backend";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "@vidalii/backend/dist/vidalii.server.apollo";
import { Groups } from "../group/group.enum.api";

//TODO define how to save SECRET
export const SECRET = 'mySECRET'
export type TOKEN = {
    _id_user: string,
    groups: string[]
}

export interface ContextSession extends Context {
    session: TOKEN
}

VidaliiService.server.addContext(
    async (data) => {
        const auth = data.req?.headers?.authorization || null
        // if (auth === null) throw new AuthenticationError('You must be logged in.');
        if (auth !== null) {
            const token = auth.split('Bearer ')[1];
            // if (!token) throw new AuthenticationError('you should provide a token');
            const dataToken = await jwt.verify(token, SECRET, (err, decoded) => {
                if (err) throw new AuthenticationError('invalid token!');
                return decoded
            }) as any as TOKEN
            console.log({ dataToken })
            return {
                session: dataToken
            } as ContextSession
        }

        return {
            session: { _id_user: 'guest', groups: [Groups.guest] }
        }


    }
)
