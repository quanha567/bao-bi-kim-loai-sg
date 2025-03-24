import crypto from 'crypto'

export const generateSalt = (): string => crypto.randomBytes(16).toString('hex')

export const hashPassword = (password: string, salt: string): string =>
    crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

export const verifyPassword = (password: string, salt: string, hash: string): boolean =>
    hashPassword(password, salt) === hash
