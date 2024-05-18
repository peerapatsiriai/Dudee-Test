import { Router, Request, Response, NextFunction } from 'express';
import {
  registerAccount,
  loginMember,
  logoutMember
} from './auth.controller';
import authenticateJWT from "../../middleware/jwtCheck"

const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.post('/register', registerAccount);
router.post('/login', loginMember);
router.post('/logout', authenticateJWT, logoutMember);


router.all('*', methodNotAllowed);

export const authRouter = router;

