import { Router, Request, Response, NextFunction } from 'express';
import {
    getAllOrderByMemberId
} from './order.controller';
import authenticateJWT from "../../middleware/jwtCheck"


const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.get('/', authenticateJWT, getAllOrderByMemberId);


router.all('*', methodNotAllowed);

export const orderRoute = router;

