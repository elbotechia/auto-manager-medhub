import { Router } from 'express';
import EmployeesController from '../controllers/employeesController.js';
import { validatorCreateEmployee, validatorUpdateEmployee } from '../validators/employee.js';
import { validateNeedsId } from '../validators/global.js';

export class EmployeesRouter {
    constructor() {
        this.router = Router();
        this.employeesController = new EmployeesController();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", this.employeesController.getItems.bind(this.employeesController));
        this.router.get("/:id", validateNeedsId, this.employeesController.getItem.bind(this.employeesController));
        this.router.post("/", validatorCreateEmployee, this.employeesController.createItem.bind(this.employeesController));
        this.router.put("/:id", validateNeedsId, validatorUpdateEmployee, this.employeesController.updateItem.bind(this.employeesController));
        this.router.delete("/:id", validateNeedsId, this.employeesController.deleteItem.bind(this.employeesController));
        this.router.get("/role/:role", this.employeesController.getByRole.bind(this.employeesController));
    }

    getRouter() {
        return this.router;
    }
}
