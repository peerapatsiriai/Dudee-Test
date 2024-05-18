"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
const router = (0, express_1.Router)();
// Middleware to handle unsupported methods
const methodNotAllowed = (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
};
router.get('/', jwtCheck_1.default, order_controller_1.getAllOrderByMemberId);
router.all('*', methodNotAllowed);
exports.orderRoute = router;
