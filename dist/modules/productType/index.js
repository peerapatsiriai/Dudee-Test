"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeRoute = void 0;
const express_1 = require("express");
const productType_controller_1 = require("./productType.controller");
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
const router = (0, express_1.Router)();
// Middleware to handle unsupported methods
const methodNotAllowed = (req, res, next) => {
    res.status(405).json({ error: 'Method Not Allowed' });
};
// CRUD Product Type
router.get('/', jwtCheck_1.default, productType_controller_1.listAllProductType);
router.post('/', jwtCheck_1.default, productType_controller_1.addNewProductType);
router.put('/:product_type_id', jwtCheck_1.default, productType_controller_1.editProductType);
router.delete('/:product_type_id', jwtCheck_1.default, productType_controller_1.deleteProductType);
router.post('/:product_type_id/add', jwtCheck_1.default, productType_controller_1.addProductToProductType); // Add New product in Product Type
router.all('*', methodNotAllowed);
exports.productTypeRoute = router;
