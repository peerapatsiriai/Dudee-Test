import { Request, Response } from "express";
import { ProductTypeDTO } from '../../dto/productTypeInfo'
import { ProductDTO } from '../../dto/productInfo'
import * as productTypeService from "../../repository/productTypeRepository";
import * as productService from "../../repository/productRepository";

// Display all productType
export const listAllProductType = async (req: Request, res: Response) => {
    try {
        const productsTypeList: ProductTypeDTO[] | null = await productTypeService.getAllProductTypes();

        if (!productsTypeList) {
            return res.status(404).json({ message: 'No product types found' });
        }

        return res.status(200).json(productsTypeList);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

// Create new Product Type
export const addNewProductType = async (req: Request, res: Response) => {
    try {
        const { product_type_name, product_type_description, product_type_base_price } = req.body;

        // Validate the request body content
        if (
            !product_type_name.trim() ||
            !product_type_description.trim() ||
            !product_type_base_price
        ) {
            return res.status(400).json({ error: "Invalid request body format" });
        }

        // Validate the request body types
        if (
            typeof product_type_name !== "string" ||
            typeof product_type_description !== "string" 
        ) {
            return res.status(400).json({ error: "Invalid  request body type" });
        }

        const newProductType: ProductTypeDTO | null = await productTypeService.createNewProductType(
            product_type_name,
            product_type_description,
            product_type_base_price,
        );

        if (!newProductType) {
            return res.status(500).json({ error: 'Failed to create new product type' });
        }

        return res.status(201).json({ message: 'Product type created successfully', productType: newProductType });
    } catch (error) {
        console.error('Error adding new product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Add new product in Product Type
export const addProductToProductType = async (req: Request, res: Response) => {
    try {
        const product_type_id = req.params.product_type_id;

        // validate the request body content
        if (!product_type_id) {
            return res.status(400).json({ error: "Invalid request body format" });
        }

        const productType = await productTypeService.getOneProductTypeById(Number(product_type_id));
        
        if (!productType) {
            return res.status(404).json({ error: 'Product type not found' });
        }

        const product = await productService.addNewProduct(Number(product_type_id));

        if (!product) {
            return res.status(500).json({ error: 'Failed to add new product' });
        }

        const countProductType = await productService.countProduct(Number(product_type_id));

        if (!countProductType) {
            return res.status(500).json({ error: 'Failed to count product' });
        }

        return res.status(201).json({ message: `Product added successfully now have ${countProductType} products in this product type` });
        
    } catch (error) {
        
    }
}

// Edit Product Type
export const editProductType = async (req: Request, res: Response) => {
    try {
        const product_id_to_edit = req.params.product_type_id;
        const { product_type_id, product_type_name, product_type_description, product_type_base_price } = req.body;

        // Validate the request body content
        if (
            !product_type_id ||
            !product_type_name.trim() ||
            !product_type_description.trim() ||
            !product_type_base_price
        ) {
            return res.status(400).json({ error: "Invalid request body format" });
        }

        // Validate the request body types
        if (
            typeof product_type_id !== "number" ||
            typeof product_type_name !== "string" ||
            typeof product_type_description !== "string" 
        ) {
            return res.status(400).json({ error: "Invalid  request body type" });
        }

        if(Number(product_id_to_edit) !== product_type_id) {
            return res.status(400).json({ error: "Invalid product type id" });
        }

        const fineProductType: ProductTypeDTO | null = await productTypeService.getOneProductTypeById(product_type_id);

        if (!fineProductType) {
            return res.status(404).json({ error: 'Product type not found' });
        }

        const editedProductType: ProductTypeDTO | null = await productTypeService.updateProductType(
            product_type_id,
            product_type_name,
            product_type_description,
            product_type_base_price,
        );

        if (!editedProductType) {
            return res.status(500).json({ error: 'Failed to edit product type' });
        }

        return res.status(200).json({ message: 'Product type edited successfully', productType: editedProductType });
    } catch (error) {
        console.error('Error editing product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete Product Type
export const deleteProductType = async (req: Request, res: Response) => {
    try {

        const product_id_to_delete = req.params.product_type_id;

        const deletedProductType: boolean = await productTypeService.deleteProductType(Number(product_id_to_delete));

        if (!deletedProductType) {
            return res.status(404).json({ error: 'Product type not found' });
        }

        return res.status(200).json({ message: `Product type: ${product_id_to_delete}  deleted successfully` });
    } catch (error) {
        console.error('Error deleting product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
