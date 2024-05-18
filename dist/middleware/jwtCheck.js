"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtils_1 = require("../utils/authUtils");
const authenticateJWT = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { valid, decoded, error } = (0, authUtils_1.decryptionToken)(token);
        if (valid) {
            req.memberID = decoded.memberId;
            next();
        }
        else {
            return res.status(401).json({ message: 'Token is invalid', error });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.default = authenticateJWT;
