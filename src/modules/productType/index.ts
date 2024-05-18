import { Router, Request, Response, NextFunction } from 'express';
import {
    listAllProductType,
    addNewProductType,
    editProductType,
    deleteProductType
} from './productType.controller';
import authenticateJWT from "../../middleware/jwtCheck"


const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.get('/', authenticateJWT, listAllProductType );
router.post('/', authenticateJWT, addNewProductType);
router.put('/:product_type_id', authenticateJWT, editProductType);
router.delete('/:product_type_id', authenticateJWT, deleteProductType);


router.all('*', methodNotAllowed);

export const productTypeRoute = router;

