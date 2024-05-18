import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { AccountDTO } from '../dto/accountInfo';

const prisma = new PrismaClient();

export const createAccount = async (tx: any, data: { account_username: string; account_password: string; }): Promise<AccountDTO> => {
    try {
        const hashedPassword = await bcrypt.hash(data.account_password, 10);

        const account = await tx.account.create({
            data: {
                account_username: data.account_username,
                account_password: hashedPassword,
                account_status: 1, // Status 1 is Normal
                account_created_at: new Date().toISOString(),
                account_updated_at: new Date().toISOString(),
            },
        });

        return account;
    } catch (error) {
        throw new Error('Failed to create account.');
    } 
};

export const getAccountByUsername = async (account_username: string): Promise<AccountDTO | null> => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                account_username: account_username,
            },
        });

        if (!account) {
            return null;
        }

        return account;
    } catch (error) {
        throw new Error('Failed to get account by username.');
    } 
};
