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
exports.checkOutCart = exports.getOneCartByCartId = exports.getAllCartByMemberId = exports.createCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create Cart with member_id and product_type_id
const createCart = (member_id, product_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCart = yield prisma.cart.create({
            data: {
                member_id,
                product_type_id,
                cart_status: 1, // Status 1 is Normal
                cart_created_at: new Date(),
                cart_updated_at: new Date(),
            },
        });
        return newCart;
    }
    catch (error) {
        console.error('Error creating cart:', error); // Logging the error for debugging
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createCart = createCart;
// Get cart by member_id and product_type_id
const getAllCartByMemberId = (member_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield prisma.cart.findMany({
            where: {
                member_id: member_id,
                cart_status: 1, // Status 1 is Normal
                cart_deleted_at: null,
            },
            select: {
                cart_id: true,
                ProductType: {
                    select: {
                        product_type_name: true,
                        product_type_id: true
                    }
                }
            }
        });
        return carts.map(cart => ({
            cart_id: cart.cart_id,
            product_type_id: cart.ProductType.product_type_id,
            product_type_name: cart.ProductType.product_type_name
        }));
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getAllCartByMemberId = getAllCartByMemberId;
// Get One Cart by cart_id
const getOneCartByCartId = (cart_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield prisma.cart.findFirst({
            where: {
                cart_status: 1, // Status 1 is Normal
                cart_id,
            },
        });
        return cart;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getOneCartByCartId = getOneCartByCartId;
// Check out cart
const checkOutCart = (cart_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkOutCart = yield prisma.cart.update({
            where: {
                cart_id,
            },
            data: {
                cart_status: 2, // Status 2 is Checked Out
                cart_updated_at: new Date(),
            },
        });
        return checkOutCart;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.checkOutCart = checkOutCart;
