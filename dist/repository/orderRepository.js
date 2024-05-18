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
exports.getAllOrderByMemberId = exports.saveOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Save Order
const saveOrder = (cart_id, product_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield prisma.order.create({
            data: {
                cart_id,
                product_id,
                order_status: 1, // Status 1 is Normal
                promotion_id: 1,
                order_created_at: new Date(),
                order_updated_at: new Date(),
            },
        });
        return newOrder;
    }
    catch (error) {
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.saveOrder = saveOrder;
// Get All Order By Member Id
const getAllOrderByMemberId = (member_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany({
            where: {
                Cart: {
                    member_id: member_id
                },
                order_deleted_at: null // Optional: Exclude soft-deleted orders
            },
            include: {
                Cart: {
                    include: {
                        Member: true,
                        ProductType: true, // Include ProductType through the cart relation
                    }
                },
                Product: true,
            }
        });
        return orders.map(order => ({
            order_id: order.order_id,
            product_type_name: order.Cart.ProductType.product_type_name,
            check_out_date: order.order_created_at
        }));
    }
    catch (error) {
        console.error('Error fetching orders by member_id:', error); // Log error for debugging
        return null;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getAllOrderByMemberId = getAllOrderByMemberId;
