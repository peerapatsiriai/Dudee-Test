import { PrismaClient } from '@prisma/client';
import { ProductDTO } from '../dto/productInfo';

const prisma = new PrismaClient();

// Add new product in product type
export const addNewProduct = async (product_type_id: number): Promise<ProductDTO | null> => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                product_type_id,
                product_status: 1, // Status 1 is Normal
                product_created_at: new Date(),
                product_updated_at: new Date(),
            },
        });
        return newProduct;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

// Count product in product type
export const countProduct = async (product_type_id: number): Promise<number | null> => {
    try {
        const countProduct = await prisma.product.count({
            where: {
                product_status: 1,
                product_type_id,
            },
        });
        return countProduct;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

// Get one product by product type id
export const getOneProductNotSellByProductTypeId = async (product_type_id: number): Promise<ProductDTO | null> => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                product_type_id,
                product_status: 1, // Status 1 is Normal
            },
        });
        return product;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

// Check out product in product type
export const checkOutProduct = async (product_id: number): Promise<ProductDTO | null> => {
    try {
        const checkOutProduct = await prisma.product.update({
            where: {
                product_id,
            },
            data: {
                product_status: 2, // Status 2 is Checked Out
                product_updated_at: new Date(),
            },
        });
        return checkOutProduct;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

