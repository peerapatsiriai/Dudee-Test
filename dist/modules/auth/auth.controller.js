"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutMember = exports.loginMember = exports.registerAccount = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUtils_1 = require("../../utils/authUtils");
const authService = __importStar(require("../../repository/authRepository"));
const memberService = __importStar(require("../../repository/memberRepository"));
const accountService = __importStar(require("../../repository/accountRepository"));
// Create a new account
const registerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account_username, account_password, member_first_name, member_last_name } = req.body;
        // Validate the request body content
        if (!account_username.trim() ||
            !account_password.trim() ||
            !member_first_name.trim() ||
            !member_last_name.trim()) {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        // Validate the request body types
        if (typeof account_username !== "string" ||
            typeof account_password !== "string" ||
            typeof member_first_name !== "string" ||
            typeof member_last_name !== "string") {
            return res.status(400).json({ error: "Invalid  request body type" });
        }
        const data = {
            account_username,
            account_password,
            member_first_name,
            member_last_name,
        };
        const { account, member } = yield authService.createAccountAndMember(data);
        return res.status(201).json({ account, member });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.registerAccount = registerAccount;
// Login member
const loginMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account_username, account_password } = req.body;
        // Validate the request body types
        if (typeof account_username !== "string" ||
            typeof account_password !== "string") {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        // Validate the request body content
        if (!account_username.trim() || !account_password.trim()) {
            return res.status(400).json({ error: "Account username and password cannot be empty", });
        }
        const account = yield accountService.getAccountByUsername(account_username);
        if (!account) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(account_password, account.account_password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const member = yield memberService.getMemberByAccountId(account.account_id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        // Generate a JWT for the member
        const token = (0, authUtils_1.generateToken)(member.member_id);
        return res.status(200).json({ message: "Login successful", token, account, member });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to log in" });
    }
});
exports.loginMember = loginMember;
// Logout
const logoutMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.memberID;
    return res.status(200).json({ message: `MemberID: ${memberId} logout successfully` });
});
exports.logoutMember = logoutMember;
