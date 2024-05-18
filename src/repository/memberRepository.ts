import { PrismaClient } from '@prisma/client';
import { MemberDTO } from '../dto/memberInfo';

const prisma = new PrismaClient();

export const createMember = async (tx: any, data: { account_id: number, member_first_name: string, member_last_name: string }): Promise<MemberDTO> => {
    try {
        const member = await tx.member.create({
            data: {
                account_id: data.account_id,
                member_first_name: data.member_first_name,
                member_last_name: data.member_last_name,
                member_status: 1, // Status 1 is normal
                member_created_at: new Date().toISOString(),
                member_updated_at: new Date().toISOString(),
            },
        });

        return {
            member_id: member.member_id,
            account_id: member.account_id,
            member_first_name: member.member_first_name,
            member_last_name: member.member_last_name,
            member_status: member.member_status,
            member_created_at: member.member_created_at,
            member_updated_at: member.member_updated_at,
        };
    } catch (error) {
        throw new Error('Failed to create member.');
    }
};

export const getMemberByAccountId = async (account_id: number): Promise<MemberDTO | null> => {
    try {
        const member = await prisma.member.findFirst({
            where: {
                account_id: account_id,
            },
        });

        if (!member) {
            return null;
        }

        return {
            member_id: member.member_id,
            account_id: member.account_id,
            member_first_name: member.member_first_name,
            member_last_name: member.member_last_name,
            member_status: member.member_status,
            member_created_at: member.member_created_at,
            member_updated_at: member.member_updated_at,
        };
    } catch (error) {
        throw new Error('Failed to get member by account ID.');
    }
};
