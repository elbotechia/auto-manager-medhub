import { Router } from 'express';
import TicketsController from '../controllers/ticketsController.js';
import { validatorCreateTicket, validatorUpdateTicket } from '../validators/ticket.js';
import { validateNeedsId } from '../validators/global.js';

export class TicketsRouter {
    constructor() {
        this.router = Router();
        this.ticketsController = new TicketsController();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", this.ticketsController.getItems.bind(this.ticketsController));
        this.router.get("/:id", validateNeedsId, this.ticketsController.getItem.bind(this.ticketsController));
        this.router.post("/", validatorCreateTicket, this.ticketsController.createItem.bind(this.ticketsController));
        this.router.put("/:id", validateNeedsId, validatorUpdateTicket, this.ticketsController.updateItem.bind(this.ticketsController));
        this.router.delete("/:id", validateNeedsId, this.ticketsController.deleteItem.bind(this.ticketsController));
        this.router.get("/status/:status", this.ticketsController.getByStatus.bind(this.ticketsController));
        this.router.get("/client/:clientId", validateNeedsId, this.ticketsController.getByClient.bind(this.ticketsController));
    }

    getRouter() {
        return this.router;
    }
}
