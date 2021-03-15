import crypto from "crypto";


export async function hash(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$')
}

export async function verifyPassword(password,original) {
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];

        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

        if (hash === originalHash)
            return true;
        else
            return false;
}