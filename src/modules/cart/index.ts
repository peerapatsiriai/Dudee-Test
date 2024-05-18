import { Router, Request, Response, NextFunction } from 'express';
import {
  getCartByMemberId,
  createCart,
  checkProductByCartId
} from './cart.controller';
import authenticateJWT from "../../middleware/jwtCheck"


const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.get('/', authenticateJWT,  getCartByMemberId);
router.post('/:product_type_id/mycard', authenticateJWT,  createCart);
router.post('/:cart_id/checkout', authenticateJWT,  checkProductByCartId);

router.all('*', methodNotAllowed);

export const cartRoute = router;

