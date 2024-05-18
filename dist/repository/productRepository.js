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
exports.checkOutProduct = exports.getOneProductNotSellByProductTypeId = exports.countProduct = exports.addNewProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add new product in product type
const addNewProduct = (product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield prisma.product.create({
            data: {
                product_type_id,
                product_status: 1, // Status 1 is Normal
                product_created_at: new Date(),
                product_updated_at: new Date(),
            },
        });
        return newProduct;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.addNewProduct = addNewProduct;
// Count product in product type
const countProduct = (product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countProduct = yield prisma.product.count({
            where: {
                product_status: 1,
                product_type_id,
            },
        });
        return countProduct;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.countProduct = countProduct;
// Get one product by product type id
const getOneProductNotSellByProductTypeId = (product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.product.findFirst({
            where: {
                product_type_id,
                product_status: 1, // Status 1 is Normal
            },
        });
        return product;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getOneProductNotSellByProductTypeId = getOneProductNotSellByProductTypeId;
// Check out product in product type
const checkOutProduct = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkOutProduct = yield prisma.product.update({
            where: {
                product_id,
            },
            data: {
                product_status: 2, // Status 2 is Checked Out
                product_updated_at: new Date(),
            },
        });
        return checkOutProduct;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.checkOutProduct = checkOutProduct;
