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
exports.deleteProductType = exports.updateProductType = exports.createNewProductType = exports.getOneProductTypeById = exports.getAllProductTypes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProductTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productTypes = yield prisma.productType.findMany({
            where: {
                product_type_deleted_at: null, // soft delete
            },
        });
        if (!productTypes || !productTypes.length) {
            return null;
        }
        const productCounts = yield prisma.product.groupBy({
            by: ['product_type_id'],
            where: {
                product_status: 1,
                product_deleted_at: null,
            },
            _count: {
                _all: true,
            },
        });
        const productCountMap = productCounts.reduce((acc, product) => {
            acc[product.product_type_id] = product._count._all;
            return acc;
        }, {});
        return productTypes.map((productType) => ({
            product_type_id: productType.product_type_id,
            category_id: productType.category_id,
            product_type_name: productType.product_type_name,
            product_type_description: productType.product_type_description,
            product_type_base_price: productType.product_type_base_price,
            product_type_status: productType.product_type_status,
            Amount: productCountMap[productType.product_type_id] || 0,
            promotion_id: productType.promotion_id,
            product_type_created_at: productType.product_type_created_at,
            product_type_updated_at: productType.product_type_updated_at,
            product_type_deleted_at: productType.product_type_deleted_at,
        }));
    }
    catch (error) {
        console.error('Error fetching product types:', error); // Log error for debugging
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getAllProductTypes = getAllProductTypes;
const getOneProductTypeById = (product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productType = yield prisma.productType.findUnique({
            where: {
                product_type_id,
            },
        });
        if (!productType) {
            return null;
        }
        return {
            product_type_id: productType.product_type_id,
            category_id: productType.category_id,
            product_type_name: productType.product_type_name,
            product_type_description: productType.product_type_description,
            product_type_base_price: productType.product_type_base_price,
            product_type_status: productType.product_type_status,
            promotion_id: productType.promotion_id,
            product_type_created_at: productType.product_type_created_at,
            product_type_updated_at: productType.product_type_updated_at,
            product_type_deleted_at: productType.product_type_deleted_at,
        };
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getOneProductTypeById = getOneProductTypeById;
const createNewProductType = (product_type_name, product_type_description, product_type_base_price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProductType = yield prisma.productType.create({
            data: {
                product_type_name,
                product_type_description,
                product_type_base_price,
                category_id: 1,
                product_type_status: 1, // Status 1 is Normal
                promotion_id: 1,
                product_type_created_at: new Date(),
                product_type_updated_at: new Date(),
            },
        });
        const productTypeDTO = {
            product_type_id: newProductType.product_type_id,
            category_id: newProductType.category_id,
            product_type_name: newProductType.product_type_name,
            product_type_description: newProductType.product_type_description,
            product_type_base_price: newProductType.product_type_base_price,
            product_type_status: newProductType.product_type_status,
            promotion_id: newProductType.promotion_id,
            product_type_created_at: newProductType.product_type_created_at,
            product_type_updated_at: newProductType.product_type_updated_at,
            product_type_deleted_at: newProductType.product_type_deleted_at,
        };
        return productTypeDTO;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createNewProductType = createNewProductType;
const updateProductType = (product_type_id, product_type_name, product_type_description, product_type_base_price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProductType = yield prisma.productType.update({
            where: {
                product_type_id,
            },
            data: {
                product_type_name,
                product_type_description,
                product_type_base_price,
                product_type_updated_at: new Date(),
            },
        });
        return updatedProductType;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.updateProductType = updateProductType;
const deleteProductType = (product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.productType.update({
            where: {
                product_type_id,
            },
            data: {
                product_type_deleted_at: new Date(),
            },
        });
        return true;
    }
    catch (error) {
        return false;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.deleteProductType = deleteProductType;
