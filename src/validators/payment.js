import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreatePayment = [
    check("method")
        .exists()
        .withMessage("Método de pagamento é obrigatório")
        .notEmpty()
        .withMessage("Método de pagamento não pode ser vazio")
        .isIn(['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Transferência Bancária', 'Cheque'])
        .withMessage("Método de pagamento inválido"),
    
    check("status")
        .exists()
        .withMessage("Status é obrigatório")
        .notEmpty()
        .withMessage("Status não pode ser vazio")
        .isIn(['Pendente', 'Pago', 'Cancelado', 'Estornado'])
        .withMessage("Status de pagamento inválido"),
    
    check("quantity")
        .exists()
        .withMessage("Quantidade é obrigatória")
        .isInt({ min: 1 })
        .withMessage("Quantidade deve ser um número inteiro maior que 0"),
    
    check("baseAmount")
        .exists()
        .withMessage("Valor base é obrigatório")
        .isFloat({ min: 0.01 })
        .withMessage("Valor base deve ser maior que 0"),
    
    check("totalAmount")
        .exists()
        .withMessage("Valor total é obrigatório")
        .isFloat({ min: 0.01 })
        .withMessage("Valor total deve ser maior que 0"),
    
    check("transactionId")
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage("ID da transação deve ter entre 3 e 100 caracteres"),
    
    check("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Desconto deve ser um valor positivo"),
    
    check("serviceId")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("clientId")
        .optional()
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdatePayment = [
    check("method")
        .optional()
        .notEmpty()
        .withMessage("Método de pagamento não pode ser vazio")
        .isIn(['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Transferência Bancária', 'Cheque'])
        .withMessage("Método de pagamento inválido"),
    
    check("status")
        .optional()
        .notEmpty()
        .withMessage("Status não pode ser vazio")
        .isIn(['Pendente', 'Pago', 'Cancelado', 'Estornado'])
        .withMessage("Status de pagamento inválido"),
    
    check("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantidade deve ser um número inteiro maior que 0"),
    
    check("baseAmount")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Valor base deve ser maior que 0"),
    
    check("totalAmount")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Valor total deve ser maior que 0"),
    
    check("transactionId")
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage("ID da transação deve ter entre 3 e 100 caracteres"),
    
    check("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Desconto deve ser um valor positivo"),
    
    check("serviceId")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("clientId")
        .optional()
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notas devem ter no máximo 500 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
