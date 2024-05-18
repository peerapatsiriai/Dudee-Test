"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptionToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'Banana';
const generateToken = (memberId) => {
    const payload = { memberId };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
};
exports.generateToken = generateToken;
const decryptionToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return { valid: true, decoded, error: null };
    }
    catch (error) {
        return { valid: false, decoded: null, error: error };
    }
};
exports.decryptionToken = decryptionToken;
