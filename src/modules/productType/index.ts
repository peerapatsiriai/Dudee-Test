import { Router, Request, Response, NextFunction } from 'express';
import {
    listAllProductType,
    addNewProductType,
    editProductType,
    deleteProductType,
    addProductToProductType,
} from './productType.controller';
import authenticateJWT from "../../middleware/jwtCheck"


const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

// CRUD Product Type
router.get('/', authenticateJWT, listAllProductType );
router.post('/', authenticateJWT, addNewProductType);
router.put('/:product_type_id', authenticateJWT, editProductType);
router.delete('/:product_type_id', authenticateJWT, deleteProductType);

router.post('/:product_type_id/add', authenticateJWT, addProductToProductType); // Add New product in Product Type

router.all('*', methodNotAllowed);

export const productTypeRoute = router;

