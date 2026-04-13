import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateVehicle = [
    check("make")
        .exists()
        .withMessage("Marca é obrigatória")
        .notEmpty()
        .withMessage("Marca não pode ser vazia")
        .isLength({ min: 2, max: 50 })
        .withMessage("Marca deve ter entre 2 e 50 caracteres"),
    
    check("model")
        .exists()
        .withMessage("Modelo é obrigatório")
        .notEmpty()
        .withMessage("Modelo não pode ser vazio")
        .isLength({ min: 1, max: 50 })
        .withMessage("Modelo deve ter entre 1 e 50 caracteres"),
    
    check("year")
        .exists()
        .withMessage("Ano é obrigatório")
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage(`Ano deve estar entre 1900 e ${new Date().getFullYear() + 1}`),
    
    check("licensePlate")
        .exists()
        .withMessage("Placa é obrigatória")
        .notEmpty()
        .withMessage("Placa não pode ser vazia")
        .matches(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)
        .withMessage("Placa inválida. Use formato ABC-1234 ou ABC1D23"),
    
    check("clientId")
        .exists()
        .withMessage("ID do cliente é obrigatório")
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("color")
        .optional()
        .isLength({ max: 30 })
        .withMessage("Cor deve ter no máximo 30 caracteres"),
    
    check("engineSize")
        .optional()
        .isLength({ max: 20 })
        .withMessage("Tamanho do motor deve ter no máximo 20 caracteres"),
    
    check("fuelType")
        .optional()
        .isIn(['Gasolina', 'Etanol', 'Flex', 'Diesel', 'GNV', 'Elétrico', 'Híbrido'])
        .withMessage("Tipo de combustível inválido"),
    
    check("annotations")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Anotações devem ter no máximo 1000 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateVehicle = [
    check("make")
        .optional()
        .notEmpty()
        .withMessage("Marca não pode ser vazia")
        .isLength({ min: 2, max: 50 })
        .withMessage("Marca deve ter entre 2 e 50 caracteres"),
    
    check("model")
        .optional()
        .notEmpty()
        .withMessage("Modelo não pode ser vazio")
        .isLength({ min: 1, max: 50 })
        .withMessage("Modelo deve ter entre 1 e 50 caracteres"),
    
    check("year")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage(`Ano deve estar entre 1900 e ${new Date().getFullYear() + 1}`),
    
    check("licensePlate")
        .optional()
        .notEmpty()
        .withMessage("Placa não pode ser vazia")
        .matches(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)
        .withMessage("Placa inválida. Use formato ABC-1234 ou ABC1D23"),
    
    check("clientId")
        .optional()
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("color")
        .optional()
        .isLength({ max: 30 })
        .withMessage("Cor deve ter no máximo 30 caracteres"),
    
    check("engineSize")
        .optional()
        .isLength({ max: 20 })
        .withMessage("Tamanho do motor deve ter no máximo 20 caracteres"),
    
    check("fuelType")
        .optional()
        .isIn(['Gasolina', 'Etanol', 'Flex', 'Diesel', 'GNV', 'Elétrico', 'Híbrido'])
        .withMessage("Tipo de combustível inválido"),
    
    check("annotations")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Anotações devem ter no máximo 1000 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
