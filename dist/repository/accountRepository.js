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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountByUsername = exports.createAccount = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAccount = (tx, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(data.account_password, 10);
        const account = yield tx.account.create({
            data: {
                account_username: data.account_username,
                account_password: hashedPassword,
                account_status: 1, // Status 1 is Normal
                account_created_at: new Date().toISOString(),
                account_updated_at: new Date().toISOString(),
            },
        });
        return account;
    }
    catch (error) {
        throw new Error('Failed to create account.');
    }
});
exports.createAccount = createAccount;
const getAccountByUsername = (account_username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield prisma.account.findUnique({
            where: {
                account_username: account_username,
            },
        });
        if (!account) {
            return null;
        }
        return account;
    }
    catch (error) {
        throw new Error('Failed to get account by username.');
    }
});
exports.getAccountByUsername = getAccountByUsername;
