import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateClient = [
    check("fullName")
        .exists()
        .withMessage("Nome completo é obrigatório")
        .notEmpty()
        .withMessage("Nome completo não pode ser vazio")
        .isLength({ min: 2, max: 100 })
        .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    
    check("email")
        .exists()
        .withMessage("Email é obrigatório")
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    check("phone")
        .exists()
        .withMessage("Telefone é obrigatório")
        .notEmpty()
        .withMessage("Telefone não pode ser vazio")
        .matches(/^[\d\s\-\(\)\+]{10,15}$/)
        .withMessage("Telefone inválido"),
    
    check("address")
        .exists()
        .withMessage("Endereço é obrigatório")
        .notEmpty()
        .withMessage("Endereço não pode ser vazio")
        .isLength({ min: 10, max: 200 })
        .withMessage("Endereço deve ter entre 10 e 200 caracteres"),
    
    check("cpf")
        .optional()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage("CPF deve estar no formato XXX.XXX.XXX-XX"),
    
    check("birthDate")
        .optional()
        .isISO8601()
        .withMessage("Data de nascimento inválida"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateClient = [
    check("fullName")
        .optional()
        .notEmpty()
        .withMessage("Nome completo não pode ser vazio")
        .isLength({ min: 2, max: 100 })
        .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    
    check("email")
        .optional()
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    check("phone")
        .optional()
        .notEmpty()
        .withMessage("Telefone não pode ser vazio")
        .matches(/^[\d\s\-\(\)\+]{10,15}$/)
        .withMessage("Telefone inválido"),
    
    check("address")
        .optional()
        .notEmpty()
        .withMessage("Endereço não pode ser vazio")
        .isLength({ min: 10, max: 200 })
        .withMessage("Endereço deve ter entre 10 e 200 caracteres"),
    
    check("cpf")
        .optional()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage("CPF deve estar no formato XXX.XXX.XXX-XX"),
    
    check("birthDate")
        .optional()
        .isISO8601()
        .withMessage("Data de nascimento inválida"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
