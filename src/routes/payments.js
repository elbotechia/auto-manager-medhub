import { Router } from 'express';
import PaymentsController from '../controllers/paymentsController.js';
import { validatorCreatePayment, validatorUpdatePayment } from '../validators/payment.js';
import { validateNeedsId } from '../validators/global.js';

export class PaymentsRouter {
    constructor() {
        this.router = Router();
        this.paymentsController = new PaymentsController();
        this.setRoutes();
    }

    setRoutes() {
        // GET /payments - Obter todos os pagamentos
        this.router.get(
            "/", 
            this.paymentsController.getItems.bind(this.paymentsController)
        );

        // GET /payments/:id - Obter um pagamento específico
        this.router.get(
            "/:id", 
            validateNeedsId,
            this.paymentsController.getItem.bind(this.paymentsController)
        );

        // POST /payments - Criar um novo pagamento
        this.router.post(
            "/", 
            validatorCreatePayment,
            this.paymentsController.createItem.bind(this.paymentsController)
        );

        // PUT /payments/:id - Atualizar um pagamento
        this.router.put(
            "/:id", 
            validateNeedsId,
            validatorUpdatePayment,
            this.paymentsController.updateItem.bind(this.paymentsController)
        );

        // DELETE /payments/:id - Deletar um pagamento
        this.router.delete(
            "/:id", 
            validateNeedsId,
            this.paymentsController.deleteItem.bind(this.paymentsController)
        );

        // GET /payments/status/:status - Obter pagamentos por status
        this.router.get(
            "/status/:status", 
            this.paymentsController.getByStatus.bind(this.paymentsController)
        );

        // GET /payments/client/:clientId - Obter pagamentos por cliente
        this.router.get(
            "/client/:clientId", 
            validateNeedsId,
            this.paymentsController.getByClient.bind(this.paymentsController)
        );

        // GET /payments/service/:serviceId - Obter pagamentos por serviço
        this.router.get(
            "/service/:serviceId", 
            validateNeedsId,
            this.paymentsController.getByService.bind(this.paymentsController)
        );
    }

    getRouter() {
        return this.router;
    }
}
