import { PrismaClient } from '@prisma/client';
import { CartDTO } from '../dto/cartInfo';

const prisma = new PrismaClient();

// Create Cart with member_id and product_type_id
export const createCart = async (member_id: number, product_type_id: number): Promise<CartDTO | null> => {
    try {
        const newCart = await prisma.cart.create({
            data: {
                member_id,
                product_type_id, 
                cart_status: 1, // Status 1 is Normal
                cart_created_at: new Date(), 
                cart_updated_at: new Date(), 
            },
        });
        return newCart;
    } catch (error) {
        console.error('Error creating cart:', error); // Logging the error for debugging
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

// Get cart by member_id and product_type_id
export const getAllCartByMemberId = async (member_id: number): Promise<{ cart_id: number, product_type_name: string }[] | null> => {
    try {
        const carts = await prisma.cart.findMany({
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
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

// Get One Cart by cart_id
export const getOneCartByCartId = async (cart_id: number): Promise<CartDTO | null> => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                cart_status: 1, // Status 1 is Normal
                cart_id,
            },
        });
        return cart;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

// Check out cart
export const checkOutCart = async (cart_id: number): Promise<CartDTO | null> => {
    try {
        const checkOutCart = await prisma.cart.update({
            where: {
                cart_id,
            },
            data: {
                cart_status: 2, // Status 2 is Checked Out
                cart_updated_at: new Date(),
            },
        });
        return checkOutCart;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

