"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteProductType = exports.editProductType = exports.addProductToProductType = exports.addNewProductType = exports.listAllProductType = void 0;
const productTypeService = __importStar(require("../../repository/productTypeRepository"));
const productService = __importStar(require("../../repository/productRepository"));
// Display all productType
const listAllProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsTypeList = yield productTypeService.getAllProductTypes();
        if (!productsTypeList) {
            return res.status(404).json({ message: 'No product types found' });
        }
        return res.status(200).json(productsTypeList);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.listAllProductType = listAllProductType;
// Create new Product Type
const addNewProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_type_name, product_type_description, product_type_base_price } = req.body;
        // Validate the request body content
        if (!product_type_name.trim() ||
            !product_type_description.trim() ||
            !product_type_base_price) {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        // Validate the request body types
        if (typeof product_type_name !== "string" ||
            typeof product_type_description !== "string") {
            return res.status(400).json({ error: "Invalid  request body type" });
        }
        const newProductType = yield productTypeService.createNewProductType(product_type_name, product_type_description, product_type_base_price);
        if (!newProductType) {
            return res.status(500).json({ error: 'Failed to create new product type' });
        }
        return res.status(201).json({ message: 'Product type created successfully', productType: newProductType });
    }
    catch (error) {
        console.error('Error adding new product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addNewProductType = addNewProductType;
// Add new product in Product Type
const addProductToProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_type_id = req.params.product_type_id;
        // validate the request body content
        if (!product_type_id) {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        const productType = yield productTypeService.getOneProductTypeById(Number(product_type_id));
        if (!productType) {
            return res.status(404).json({ error: 'Product type not found' });
        }
        const product = yield productService.addNewProduct(Number(product_type_id));
        if (!product) {
            return res.status(500).json({ error: 'Failed to add new product' });
        }
        const countProductType = yield productService.countProduct(Number(product_type_id));
        if (!countProductType) {
            return res.status(500).json({ error: 'Failed to count product' });
        }
        return res.status(201).json({ message: `Product added successfully now have ${countProductType} products in this product type` });
    }
    catch (error) {
    }
});
exports.addProductToProductType = addProductToProductType;
// Edit Product Type
const editProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id_to_edit = req.params.product_type_id;
        const { product_type_id, product_type_name, product_type_description, product_type_base_price } = req.body;
        // Validate the request body content
        if (!product_type_id ||
            !product_type_name.trim() ||
            !product_type_description.trim() ||
            !product_type_base_price) {
            return res.status(400).json({ error: "Invalid request body format" });
        }
        // Validate the request body types
        if (typeof product_type_id !== "number" ||
            typeof product_type_name !== "string" ||
            typeof product_type_description !== "string") {
            return res.status(400).json({ error: "Invalid  request body type" });
        }
        if (Number(product_id_to_edit) !== product_type_id) {
            return res.status(400).json({ error: "Invalid product type id" });
        }
        const fineProductType = yield productTypeService.getOneProductTypeById(product_type_id);
        if (!fineProductType) {
            return res.status(404).json({ error: 'Product type not found' });
        }
        const editedProductType = yield productTypeService.updateProductType(product_type_id, product_type_name, product_type_description, product_type_base_price);
        if (!editedProductType) {
            return res.status(500).json({ error: 'Failed to edit product type' });
        }
        return res.status(200).json({ message: 'Product type edited successfully', productType: editedProductType });
    }
    catch (error) {
        console.error('Error editing product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.editProductType = editProductType;
// Delete Product Type
const deleteProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id_to_delete = req.params.product_type_id;
        const deletedProductType = yield productTypeService.deleteProductType(Number(product_id_to_delete));
        if (!deletedProductType) {
            return res.status(404).json({ error: 'Product type not found' });
        }
        return res.status(200).json({ message: `Product type: ${product_id_to_delete}  deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting product type:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteProductType = deleteProductType;
