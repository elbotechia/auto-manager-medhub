import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateService = [
    check("item")
        .exists()
        .withMessage("Item é obrigatório")
        .notEmpty()
        .withMessage("Item não pode ser vazio")
        .isLength({ min: 3, max: 100 })
        .withMessage("Item deve ter entre 3 e 100 caracteres"),
    
    check("description")
        .exists()
        .withMessage("Descrição é obrigatória")
        .notEmpty()
        .withMessage("Descrição não pode ser vazia")
        .isLength({ min: 10, max: 500 })
        .withMessage("Descrição deve ter entre 10 e 500 caracteres"),
    
    check("price")
        .exists()
        .withMessage("Preço é obrigatório")
        .isNumeric()
        .withMessage("Preço deve ser um número")
        .isFloat({ min: 0.01 })
        .withMessage("Preço deve ser maior que 0"),
    
    check("category")
        .exists()
        .withMessage("Categoria é obrigatória")
        .notEmpty()
        .withMessage("Categoria não pode ser vazia")
        .isLength({ min: 3, max: 50 })
        .withMessage("Categoria deve ter entre 3 e 50 caracteres"),
    
    check("image")
        .optional()
        .isURL()
        .withMessage("Image deve ser uma URL válida"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateService = [
    check("item")
        .optional()
        .notEmpty()
        .withMessage("Item não pode ser vazio")
        .isLength({ min: 3, max: 100 })
        .withMessage("Item deve ter entre 3 e 100 caracteres"),
    
    check("description")
        .optional()
        .notEmpty()
        .withMessage("Descrição não pode ser vazia")
        .isLength({ min: 10, max: 500 })
        .withMessage("Descrição deve ter entre 10 e 500 caracteres"),
    
    check("price")
        .optional()
        .isNumeric()
        .withMessage("Preço deve ser um número")
        .isFloat({ min: 0.01 })
        .withMessage("Preço deve ser maior que 0"),
    
    check("category")
        .optional()
        .notEmpty()
        .withMessage("Categoria não pode ser vazia")
        .isLength({ min: 3, max: 50 })
        .withMessage("Categoria deve ter entre 3 e 50 caracteres"),
    
    check("image")
        .optional()
        .isURL()
        .withMessage("Image deve ser uma URL válida"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

