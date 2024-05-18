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
exports.createAccountAndMember = void 0;
const client_1 = require("@prisma/client");
const accountRepository_1 = require("./accountRepository");
const memberRepository_1 = require("./memberRepository");
const prisma = new client_1.PrismaClient();
const createAccountAndMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let account = null;
    let member = null;
    try {
        yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            account = yield (0, accountRepository_1.createAccount)(tx, { account_username: data.account_username, account_password: data.account_password });
            member = yield (0, memberRepository_1.createMember)(tx, { account_id: account.account_id, member_first_name: data.member_first_name, member_last_name: data.member_last_name });
        }));
        if (!account || !member) {
            throw new Error('Failed to create account and member');
        }
        return { account, member };
    }
    catch (error) {
        throw new Error('Failed to create account and member');
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createAccountAndMember = createAccountAndMember;
