import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateTicket = [
    check("issue")
        .exists()
        .withMessage("Problema é obrigatório")
        .notEmpty()
        .withMessage("Problema não pode ser vazio")
        .isLength({ min: 5, max: 200 })
        .withMessage("Problema deve ter entre 5 e 200 caracteres"),
    
    check("status")
        .optional()
        .isIn(['Pendente', 'Em Andamento', 'Aguardando Peças', 'Concluído', 'Cancelado'])
        .withMessage("Status inválido"),
    
    check("priority")
        .optional()
        .isIn(['Baixa', 'Média', 'Alta', 'Urgente'])
        .withMessage("Prioridade inválida"),
    
    check("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Descrição deve ter no máximo 1000 caracteres"),
    
    check("diagnosis")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Diagnóstico deve ter no máximo 1000 caracteres"),
    
    check("solution")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Solução deve ter no máximo 1000 caracteres"),
    
    check("estimatedCost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Custo estimado deve ser um valor positivo"),
    
    check("actualCost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Custo real deve ser um valor positivo"),
    
    check("estimatedTime")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Tempo estimado deve ser um valor positivo"),
    
    check("actualTime")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Tempo real deve ser um valor positivo"),
    
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
        .optional()
        .isArray()
        .withMessage("IDs dos serviços devem ser um array"),
    
    check("serviceIds.*")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("paymentId")
        .optional()
        .isMongoId()
        .withMessage("ID do pagamento inválido"),
    
    check("startDate")
        .optional()
        .isISO8601()
        .withMessage("Data de início inválida"),
    
    check("completionDate")
        .optional()
        .isISO8601()
        .withMessage("Data de conclusão inválida"),
    
    check("notes")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Notas devem ter no máximo 1000 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

export const validatorUpdateTicket = [
    check("issue")
        .optional()
        .notEmpty()
        .withMessage("Problema não pode ser vazio")
        .isLength({ min: 5, max: 200 })
        .withMessage("Problema deve ter entre 5 e 200 caracteres"),
    
    check("status")
        .optional()
        .isIn(['Pendente', 'Em Andamento', 'Aguardando Peças', 'Concluído', 'Cancelado'])
        .withMessage("Status inválido"),
    
    check("priority")
        .optional()
        .isIn(['Baixa', 'Média', 'Alta', 'Urgente'])
        .withMessage("Prioridade inválida"),
    
    check("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Descrição deve ter no máximo 1000 caracteres"),
    
    check("diagnosis")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Diagnóstico deve ter no máximo 1000 caracteres"),
    
    check("solution")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Solução deve ter no máximo 1000 caracteres"),
    
    check("estimatedCost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Custo estimado deve ser um valor positivo"),
    
    check("actualCost")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Custo real deve ser um valor positivo"),
    
    check("estimatedTime")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Tempo estimado deve ser um valor positivo"),
    
    check("actualTime")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Tempo real deve ser um valor positivo"),
    
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
        .isArray()
        .withMessage("IDs dos serviços devem ser um array"),
    
    check("serviceIds.*")
        .optional()
        .isMongoId()
        .withMessage("ID do serviço inválido"),
    
    check("paymentId")
        .optional()
        .isMongoId()
        .withMessage("ID do pagamento inválido"),
    
    check("startDate")
        .optional()
        .isISO8601()
        .withMessage("Data de início inválida"),
    
    check("completionDate")
        .optional()
        .isISO8601()
        .withMessage("Data de conclusão inválida"),
    
    check("notes")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Notas devem ter no máximo 1000 caracteres"),
    
    (req, res, next) => {
        validateResults(req, res, next);
    }
];
