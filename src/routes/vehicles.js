import { Router } from 'express';
import VehiclesController from '../controllers/vehiclesController.js';
import { validatorCreateVehicle, validatorUpdateVehicle } from '../validators/vehicle.js';
import { validateNeedsId } from '../validators/global.js';

export class VehiclesRouter {
    constructor() {
        this.router = Router();
        this.vehiclesController = new VehiclesController();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", this.vehiclesController.getItems.bind(this.vehiclesController));
        this.router.get("/:id", validateNeedsId, this.vehiclesController.getItem.bind(this.vehiclesController));
        this.router.post("/", validatorCreateVehicle, this.vehiclesController.createItem.bind(this.vehiclesController));
        this.router.put("/:id", validateNeedsId, validatorUpdateVehicle, this.vehiclesController.updateItem.bind(this.vehiclesController));
        this.router.delete("/:id", validateNeedsId, this.vehiclesController.deleteItem.bind(this.vehiclesController));
        this.router.get("/client/:clientId", validateNeedsId, this.vehiclesController.getByClient.bind(this.vehiclesController));
        this.router.get("/plate/:licensePlate", this.vehiclesController.getByLicensePlate.bind(this.vehiclesController));
    }

    getRouter() {
        return this.router;
    }
}
