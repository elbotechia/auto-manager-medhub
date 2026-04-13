import { Service } from "../models/schemas/servicesSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class ServicesController {
    constructor() {
        // Service is the mongoose model, not a class to instantiate
    }

    async getItems(req, res) {
        try {
            const items = await Service.find({ deleted: false });
            res.status(200).json({
                message: "Serviços obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_ITEMS", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Service.findById(id);
            
            if (!item) {
                return res.status(404).json({ 
                    message: 'Serviço não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Serviço obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_ITEM", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Service.create(req.body);
            res.status(201).json({
                message: "Serviço criado com sucesso",
                data: newItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_CREATE_ITEM", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Service.findByIdAndUpdate(
                id, 
                req.body, 
                { new: true, runValidators: true }
            );
            
            if (!updatedItem) {
                return res.status(404).json({ 
                    message: 'Serviço não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Serviço atualizado com sucesso",
                data: updatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_UPDATE_ITEM", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Service.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ 
                    message: 'Serviço não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Serviço deletado com sucesso"
            });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_ITEM", error);
        }
    }
}

export default ServicesController;