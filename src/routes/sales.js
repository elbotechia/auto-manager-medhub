import { Router } from 'express';
import SalesController from '../controllers/salesController.js';
import { validatorCreateSale, validatorUpdateSale } from '../validators/sale.js';
import { validateNeedsId } from '../validators/global.js';

export class SalesRouter {
    constructor() {
        this.router = Router();
        this.salesController = new SalesController();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", this.salesController.getItems.bind(this.salesController));
        this.router.get("/:id", validateNeedsId, this.salesController.getItem.bind(this.salesController));
        this.router.post("/", validatorCreateSale, this.salesController.createItem.bind(this.salesController));
        this.router.put("/:id", validateNeedsId, validatorUpdateSale, this.salesController.updateItem.bind(this.salesController));
        this.router.delete("/:id", validateNeedsId, this.salesController.deleteItem.bind(this.salesController));
        this.router.get("/status/:status", this.salesController.getByStatus.bind(this.salesController));
        this.router.get("/client/:clientId", validateNeedsId, this.salesController.getByClient.bind(this.salesController));
        this.router.get("/date-range", this.salesController.getByDateRange.bind(this.salesController));
    }

    getRouter() {
        return this.router;
    }
}
