import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ProductTypeDTO } from '../dto/productTypeInfo';

const prisma = new PrismaClient();

export const getAllProductTypes = async (): Promise<ProductTypeDTO[] | null> => {

    try {
        const productTypes = await prisma.productType.findMany({
            where: {
                product_type_deleted_at: null, // soft delete
            },
        });

        if (!productTypes || !productTypes.length) {
            return null;
        }

        return productTypes.map((productType) => ({
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
        }));
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

export const getOneProductTypeById = async (product_type_id: number): Promise<ProductTypeDTO | null> => {
    try {
        const productType = await prisma.productType.findUnique({
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
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

export const createNewProductType = async (
    product_type_name: string,
    product_type_description: string,
    product_type_base_price: any,
): Promise<ProductTypeDTO | null> => {
    try {

        const newProductType = await prisma.productType.create({
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

        const productTypeDTO: ProductTypeDTO = {
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
    } catch (error) {
        return null; 
    } finally {
        await prisma.$disconnect();
    }
};

export const updateProductType = async (
    product_type_id: number,
    product_type_name: string,
    product_type_description: string,
    product_type_base_price: any,
): Promise<ProductTypeDTO | null> => {
    try {

        const updatedProductType = await prisma.productType.update({
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
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteProductType = async (product_type_id: number): Promise<boolean> => {
    try {
        await prisma.productType.update({
            where: {
                product_type_id,
            },
            data: {
                product_type_deleted_at: new Date(),
            },
        });
        return true;
    } catch (error) {
        return false;
    } finally {
        await prisma.$disconnect();
    }
}