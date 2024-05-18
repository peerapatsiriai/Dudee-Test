import { Request, Response, NextFunction } from 'express';
import { decryptionToken } from '../utils/authUtils'; 

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { valid, decoded, error } = decryptionToken(token);
        
        if (valid) {     
            (req as any).memberID = (decoded as any).memberId; 
            next();
        } else {
            return res.status(401).json({ message: 'Token is invalid', error });
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export default authenticateJWT;
