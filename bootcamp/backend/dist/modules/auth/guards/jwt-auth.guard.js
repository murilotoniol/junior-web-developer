"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthGuard = jwtAuthGuard;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../../../config/jwt.config");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
function jwtAuthGuard(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw business_exception_1.BusinessException.authenticationRequired();
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw business_exception_1.BusinessException.authenticationRequired();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        throw business_exception_1.BusinessException.authenticationRequired();
    }
}
