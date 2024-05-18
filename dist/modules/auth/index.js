"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
const router = (0, express_1.Router)();
// Middleware to handle unsupported methods
const methodNotAllowed = (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
};
router.post('/register', auth_controller_1.registerAccount);
router.post('/login', auth_controller_1.loginMember);
router.post('/logout', jwtCheck_1.default, auth_controller_1.logoutMember);
router.all('*', methodNotAllowed);
exports.authRouter = router;
