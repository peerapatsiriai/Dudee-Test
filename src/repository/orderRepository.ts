import { PrismaClient } from '@prisma/client';
import { OrderDTO } from '../dto/orderInfo';

const prisma = new PrismaClient();

// Save Order
export const saveOrder = async (cart_id: number, product_id: number): Promise<OrderDTO | null> => {
    try {
        const newOrder = await prisma.order.create({
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
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

// Get All Order By Member Id
export const getAllOrderByMemberId = async (member_id: number) => {
    try {
        const orders = await prisma.order.findMany({
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
    } catch (error) {
        console.error('Error fetching orders by member_id:', error); // Log error for debugging
        return null;
    } finally {
        await prisma.$disconnect();
    }
};