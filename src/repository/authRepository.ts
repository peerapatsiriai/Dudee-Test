import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createAccount } from './accountRepository';
import { createMember } from './memberRepository';
import { MemberDTO } from '../dto/memberInfo';
import { AccountDTO } from '../dto/accountInfo';

const prisma = new PrismaClient();

export const createAccountAndMember = async (data: { account_username: string; account_password: string; member_first_name: string; member_last_name: string }): Promise<{ account: AccountDTO; member: MemberDTO }> => {
    let account: AccountDTO | null = null;
    let member: MemberDTO | null = null;

    try {
        await prisma.$transaction(async (tx) => {
            account = await createAccount(tx, { account_username: data.account_username, account_password: data.account_password });
            member = await createMember(tx, { account_id: account!.account_id, member_first_name: data.member_first_name, member_last_name: data.member_last_name });
        });

        if (!account || !member) {
            throw new Error('Failed to create account and member');
        }

        return { account, member };
    } catch (error) {
        throw new Error('Failed to create account and member');
    } finally {
        await prisma.$disconnect();
    }
};
