import { tokenVerify } from "../utils/handleJWT.js";
import { User } from "../models/schemas/userSchema.js";
import { handleHttpError } from "../errors/handleError.js";

// Middleware para verificar se o token é válido
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Token de acesso requerido"
            });
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer '
        const decoded = await tokenVerify(token);
        
        if (!decoded) {
            return res.status(401).json({
                message: "Token inválido ou expirado"
            });
        }
        
        // Buscar usuário no banco
        const user = await User.findById(decoded.id).populate('employeeId');
        
        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "Usuário inativo ou não encontrado"
            });
        }
        
        // Adicionar usuário ao request
        req.user = user;
        req.userId = user._id;
        req.userRole = user.role;
        
        next();
    } catch (error) {
        handleHttpError(res, "ERROR_AUTH_MIDDLEWARE", error);
    }
};

// Middleware para verificar se é admin
export const adminRequired = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({
            message: "Acesso restrito a administradores"
        });
    }
    next();
};

// Middleware para verificar permissões específicas
export const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user || !req.user.permissions[permission]) {
            return res.status(403).json({
                message: "Permissão insuficiente para esta ação"
            });
        }
        next();
    };
};

// Middleware para verificar se é admin ou funcionário
export const employeeOrAdminRequired = (req, res, next) => {
    if (!['admin', 'employee'].includes(req.userRole)) {
        return res.status(403).json({
            message: "Acesso restrito a funcionários ou administradores"
        });
    }
    next();
};
