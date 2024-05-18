"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberByAccountId = exports.createMember = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMember = (tx, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield tx.member.create({
            data: {
                account_id: data.account_id,
                member_first_name: data.member_first_name,
                member_last_name: data.member_last_name,
                member_status: 1, // Status 1 is normal
                member_created_at: new Date().toISOString(),
                member_updated_at: new Date().toISOString(),
            },
        });
        return member;
    }
    catch (error) {
        throw new Error('Failed to create member.');
    }
});
exports.createMember = createMember;
const getMemberByAccountId = (account_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield prisma.member.findFirst({
            where: {
                account_id: account_id,
            },
        });
        if (!member) {
            return null;
        }
        return member;
    }
    catch (error) {
        throw new Error('Failed to get member by account ID.');
    }
});
exports.getMemberByAccountId = getMemberByAccountId;
