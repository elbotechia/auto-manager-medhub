import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateSale = [
    check("date")
        .optional()
        .isISO8601()
        .withMessage("Data inválida"),
    
    check("status")
        .optional()
        .isIn(['Pendente', 'Confirmada', 'Concluída', 'Cancelada'])
        .withMessage("Status inválido"),
    
    check("totalAmount")
        .exists()
        .withMessage("Valor total é obrigatório")
        .isFloat({ min: 0.01 })
        .withMessage("Valor total deve ser maior que 0"),
    
    check("clientId")
        .exists()
        .withMessage("ID do cliente é obrigatório")
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("vehicleId")
        .exists()
        .withMessage("ID do veículo é obrigatório")
        .isMongoId()
        .withMessage("ID do veículo inválido"),
    
    check("employeeId")
        .optional()
        .isMongoId()
        .withMessage("ID do funcionário inválido"),
    
    check("serviceIds")
        .exists()
        .withMessage("IDs dos serviços são obrigatórios")
        .isArray({ min: 1 })
        .withMessage("Deve haver pelo menos um serviço"),
    
    check("serviceIds.*")
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("ticketId")
        .optional()
        .isMongoId()
        .withMessage("ID do ticket inválido"),
    
    check("paymentId")
        .optional()
        .isMongoId()
        .withMessage("ID do pagamento inválido"),
    
    check("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Desconto deve ser um valor positivo"),
    
    check("tax")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Taxa deve ser um valor positivo"),
    
    check("observations")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Observações devem ter no máximo 500 caracteres"),
    
    check("items")
        .optional()
        .isArray()
        .withMessage("Itens devem ser um array"),
    
    check("items.*.serviceId")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço no item inválido"),
    
    check("items.*.quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantidade do item deve ser um número inteiro maior que 0"),
    
    check("items.*.unitPrice")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Preço unitário deve ser maior que 0"),
    
    check("items.*.totalPrice")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Preço total do item deve ser maior que 0"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateSale = [
    check("date")
        .optional()
        .isISO8601()
        .withMessage("Data inválida"),
    
    check("status")
        .optional()
        .isIn(['Pendente', 'Confirmada', 'Concluída', 'Cancelada'])
        .withMessage("Status inválido"),
    
    check("totalAmount")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Valor total deve ser maior que 0"),
    
    check("clientId")
        .optional()
        .isMongoId()
        .withMessage("ID do cliente inválido"),
    
    check("vehicleId")
        .optional()
        .isMongoId()
        .withMessage("ID do veículo inválido"),
    
    check("employeeId")
        .optional()
        .isMongoId()
        .withMessage("ID do funcionário inválido"),
    
    check("serviceIds")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Deve haver pelo menos um serviço"),
    
    check("serviceIds.*")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("ticketId")
        .optional()
        .isMongoId()
        .withMessage("ID do ticket inválido"),
    
    check("paymentId")
        .optional()
        .isMongoId()
        .withMessage("ID do pagamento inválido"),
    
    check("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Desconto deve ser um valor positivo"),
    
    check("tax")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Taxa deve ser um valor positivo"),
    
    check("observations")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Observações devem ter no máximo 500 caracteres"),
    
    check("items")
        .optional()
        .isArray()
        .withMessage("Itens devem ser um array"),
    
    check("items.*.serviceId")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço no item inválido"),
    
    check("items.*.quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantidade do item deve ser um número inteiro maior que 0"),
    
    check("items.*.unitPrice")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Preço unitário deve ser maior que 0"),
    
    check("items.*.totalPrice")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Preço total do item deve ser maior que 0"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
