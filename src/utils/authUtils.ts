import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Banana'; 

export const generateToken = (memberId: number): string => {
    const payload = { memberId };
    return jwt.sign(payload, JWT_SECRET); 
};

export const decryptionToken = (token: string): TokenCheckResult => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { valid: true, decoded, error: null };
    } catch (error) {
        return { valid: false, decoded: null, error: error};
    }
};

interface TokenCheckResult {
    valid: boolean;
    decoded: string | object | null;
    error: any;
}