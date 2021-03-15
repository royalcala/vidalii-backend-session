import { Context, VidaliiService } from "@vidalii/backend";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "@vidalii/backend/dist/vidalii.server.apollo";

//TODO define how to save SECRET
export const SECRET = 'mySECRET'
export type TOKEN = {
    _id_user: string
}

export type ContextWithSession = Context | {
    session: TOKEN
}

VidaliiService.server.addContext(
    async (data) => {
        const auth = data.req?.headers?.authorization || null
        if (auth === null) throw new AuthenticationError('You must be logged in.');

        const token = auth.split('Bearer ')[1];
        if (!token) throw new AuthenticationError('you should provide a token');

        const dataToken: TOKEN = await jwt.verify(token, SECRET, (err, decoded) => {
            if (err) throw new AuthenticationError('invalid token!');
            return decoded;
        })

        return {
            session: dataToken
        } as ContextWithSession
    }
)