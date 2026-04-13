import { Vehicle } from "../models/schemas/vehicleSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class VehiclesController {
    constructor() {}

    async getItems(req, res) {
        try {
            const items = await Vehicle.find({ deleted: false })
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: "Veículos obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_VEHICLES", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Vehicle.findById(id)
                .populate('clientId', 'fullName email phone address');
            
            if (!item) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }
            
            res.status(200).json({
                message: "Veículo obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_VEHICLE", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Vehicle.create(req.body);
            const populatedItem = await Vehicle.findById(newItem._id)
                .populate('clientId', 'fullName email phone');
            
            res.status(201).json({
                message: "Veículo criado com sucesso",
                data: populatedItem
            });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.licensePlate) {
                return handleHttpError(res, "ERROR_LICENSE_PLATE_EXISTS", { ...error, status: 409 });
            }
            handleHttpError(res, "ERROR_CREATE_VEHICLE", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Vehicle.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .populate('clientId', 'fullName email phone');
            
            if (!updatedItem) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }
            
            res.status(200).json({
                message: "Veículo atualizado com sucesso",
                data: updatedItem
            });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.licensePlate) {
                return handleHttpError(res, "ERROR_LICENSE_PLATE_EXISTS", { ...error, status: 409 });
            }
            handleHttpError(res, "ERROR_UPDATE_VEHICLE", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Vehicle.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }
            
            res.status(200).json({ message: "Veículo deletado com sucesso" });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_VEHICLE", error);
        }
    }

    async getByClient(req, res) {
        try {
            const { clientId } = req.params;
            const items = await Vehicle.find({ clientId, deleted: false })
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: "Veículos do cliente obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_VEHICLES_BY_CLIENT", error);
        }
    }

    async getByLicensePlate(req, res) {
        try {
            const { licensePlate } = req.params;
            const item = await Vehicle.findOne({ licensePlate: licensePlate.toUpperCase(), deleted: false })
                .populate('clientId', 'fullName email phone address');
            
            if (!item) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }
            
            res.status(200).json({
                message: "Veículo encontrado",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_VEHICLE_BY_PLATE", error);
        }
    }
}

export default VehiclesController;
