import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateEmployee = [
    check("name")
        .exists()
        .withMessage("Nome é obrigatório")
        .notEmpty()
        .withMessage("Nome não pode ser vazio")
        .isLength({ min: 2, max: 100 })
        .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    
    check("role")
        .exists()
        .withMessage("Cargo é obrigatório")
        .notEmpty()
        .withMessage("Cargo não pode ser vazio")
        .isIn(['Mecânico', 'Gerente', 'Atendente', 'Supervisor', 'Técnico', 'Auxiliar'])
        .withMessage("Cargo inválido"),
    
    check("email")
        .optional()
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    check("phone")
        .optional()
        .matches(/^[\d\s\-\(\)\+]{10,15}$/)
        .withMessage("Telefone inválido"),
    
    check("cpf")
        .optional()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage("CPF deve estar no formato XXX.XXX.XXX-XX"),
    
    check("salary")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Salário deve ser um valor positivo"),
    
    check("hireDate")
        .optional()
        .isISO8601()
        .withMessage("Data de contratação inválida"),
    
    check("isActive")
        .optional()
        .isBoolean()
        .withMessage("Status ativo deve ser verdadeiro ou falso"),
    
    check("specializations")
        .optional()
        .isArray()
        .withMessage("Especializações devem ser um array"),
    
    check("specializations.*")
        .optional()
        .isString()
        .withMessage("Cada especialização deve ser uma string"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateEmployee = [
    check("name")
        .optional()
        .notEmpty()
        .withMessage("Nome não pode ser vazio")
        .isLength({ min: 2, max: 100 })
        .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    
    check("role")
        .optional()
        .notEmpty()
        .withMessage("Cargo não pode ser vazio")
        .isIn(['Mecânico', 'Gerente', 'Atendente', 'Supervisor', 'Técnico', 'Auxiliar'])
        .withMessage("Cargo inválido"),
    
    check("email")
        .optional()
        .isEmail()
        .withMessage("Email inválido")
        .normalizeEmail(),
    
    check("phone")
        .optional()
        .matches(/^[\d\s\-\(\)\+]{10,15}$/)
        .withMessage("Telefone inválido"),
    
    check("cpf")
        .optional()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage("CPF deve estar no formato XXX.XXX.XXX-XX"),
    
    check("salary")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Salário deve ser um valor positivo"),
    
    check("hireDate")
        .optional()
        .isISO8601()
        .withMessage("Data de contratação inválida"),
    
    check("isActive")
        .optional()
        .isBoolean()
        .withMessage("Status ativo deve ser verdadeiro ou falso"),
    
    check("specializations")
        .optional()
        .isArray()
        .withMessage("Especializações devem ser um array"),
    
    check("specializations.*")
        .optional()
        .isString()
        .withMessage("Cada especialização deve ser uma string"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
