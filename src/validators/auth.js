import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorLogin = [
    check("username")
        .exists()
        .withMessage("Username ou email é obrigatório")
        .notEmpty()
        .withMessage("Username ou email não pode ser vazio"),
    
    check("password")
        .exists()
        .withMessage("Senha é obrigatória")
        .notEmpty()
        .withMessage("Senha não pode ser vazia")
        .isLength({ min: 6 })
        .withMessage("Senha deve ter pelo menos 6 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorRegister = [
    check("username")
        .exists()
        .withMessage("Username é obrigatório")
        .notEmpty()
        .withMessage("Username não pode ser vazio")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username deve ter entre 3 e 50 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username deve conter apenas letras, números e underscore"),
    
    check("email")
        .exists()
        .withMessage("Email é obrigatório")
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    check("password")
        .exists()
        .withMessage("Senha é obrigatória")
        .isLength({ min: 6 })
        .withMessage("Senha deve ter pelo menos 6 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número"),
    
    check("role")
        .optional()
        .isIn(['admin', 'employee'])
        .withMessage("Role deve ser 'admin' ou 'employee'"),
    
    check("employeeId")
        .optional()
        .isMongoId()
        .withMessage("ID do funcionário inválido"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateProfile = [
    check("username")
        .optional()
        .notEmpty()
        .withMessage("Username não pode ser vazio")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username deve ter entre 3 e 50 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username deve conter apenas letras, números e underscore"),
    
    check("email")
        .optional()
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorChangePassword = [
    check("currentPassword")
        .exists()
        .withMessage("Senha atual é obrigatória")
        .notEmpty()
        .withMessage("Senha atual não pode ser vazia"),
    
    check("newPassword")
        .exists()
        .withMessage("Nova senha é obrigatória")
        .isLength({ min: 6 })
        .withMessage("Nova senha deve ter pelo menos 6 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
