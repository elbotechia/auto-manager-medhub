import { Client } from "../models/schemas/clientSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class ClientsController {
    constructor() {
        // Client is the mongoose model, not a class to instantiate
    }

    async getItems(req, res) {
        try {
            const items = await Client.find({ deleted: false });
            
            res.status(200).json({
                message: "Clientes obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_CLIENTS", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Client.findById(id);
            
            if (!item) {
                return res.status(404).json({ 
                    message: 'Cliente não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Cliente obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_CLIENT", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Client.create(req.body);
            
            res.status(201).json({
                message: "Cliente criado com sucesso",
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
            handleHttpError(res, "ERROR_CREATE_CLIENT", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Client.findByIdAndUpdate(
                id, 
                req.body, 
                { new: true, runValidators: true }
            );
            
            if (!updatedItem) {
                return res.status(404).json({ 
                    message: 'Cliente não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Cliente atualizado com sucesso",
                data: updatedItem
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
            handleHttpError(res, "ERROR_UPDATE_CLIENT", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Client.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ 
                    message: 'Cliente não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Cliente deletado com sucesso"
            });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_CLIENT", error);
        }
    }

    // Método adicional para buscar por email
    async getByEmail(req, res) {
        try {
            const { email } = req.params;
            const item = await Client.findOne({ email, deleted: false });
            
            if (!item) {
                return res.status(404).json({ 
                    message: 'Cliente não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Cliente encontrado",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_CLIENT_BY_EMAIL", error);
        }
    }

    // Método adicional para buscar por CPF
    async getByCpf(req, res) {
        try {
            const { cpf } = req.params;
            const item = await Client.findOne({ cpf, deleted: false });
            
            if (!item) {
                return res.status(404).json({ 
                    message: 'Cliente não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Cliente encontrado",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_CLIENT_BY_CPF", error);
        }
    }
}

export default ClientsController;
