import { Employee } from "../models/schemas/employeeSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class EmployeesController {
    constructor() {}

    async getItems(req, res) {
        try {
            const items = await Employee.find({ deleted: false });
            res.status(200).json({
                message: "Funcionários obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_EMPLOYEES", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Employee.findById(id);
            
            if (!item) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }
            
            res.status(200).json({
                message: "Funcionário obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_EMPLOYEE", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Employee.create(req.body);
            res.status(201).json({
                message: "Funcionário criado com sucesso",
                data: newItem
            });
        } catch (error) {
            if (error.code === 11000) {
                if (error.keyPattern.email) {
                    return handleHttpError(res, "ERROR_EMAIL_EXISTS", { ...error, status: 409 });
                }
                if (error.keyPattern.cpf) {
                    return handleHttpError(res, "ERROR_CPF_EXISTS", { ...error, status: 409 });
                }
            }
            handleHttpError(res, "ERROR_CREATE_EMPLOYEE", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            
            if (!updatedItem) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }
            
            res.status(200).json({
                message: "Funcionário atualizado com sucesso",
                data: updatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_UPDATE_EMPLOYEE", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Employee.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }
            
            res.status(200).json({ message: "Funcionário deletado com sucesso" });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_EMPLOYEE", error);
        }
    }

    async getByRole(req, res) {
        try {
            const { role } = req.params;
            const items = await Employee.find({ role, deleted: false, isActive: true });
            
            res.status(200).json({
                message: `Funcionários com cargo '${role}' obtidos com sucesso`,
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_EMPLOYEES_BY_ROLE", error);
        }
    }
}

export default EmployeesController;
