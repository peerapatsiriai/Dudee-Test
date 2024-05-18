"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
const router = (0, express_1.Router)();
// Middleware to handle unsupported methods
const methodNotAllowed = (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
};
router.get('/', jwtCheck_1.default, cart_controller_1.getCartByMemberId);
router.post('/:product_type_id/mycard', jwtCheck_1.default, cart_controller_1.createCart);
router.post('/:cart_id/checkout', jwtCheck_1.default, cart_controller_1.checkProductByCartId);
router.all('*', methodNotAllowed);
exports.cartRoute = router;
