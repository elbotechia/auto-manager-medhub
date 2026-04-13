import { Payment } from "../models/schemas/paymentSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class PaymentsController {
    constructor() {
        // Payment is the mongoose model, not a class to instantiate
    }

    async getItems(req, res) {
        try {
            const items = await Payment.find({ deleted: false })
                .populate('serviceId', 'item description price')
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: "Pagamentos obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PAYMENTS", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Payment.findById(id)
                .populate('serviceId', 'item description price category')
                .populate('clientId', 'fullName email phone address');
            
            if (!item) {
                return res.status(404).json({ 
                    message: 'Pagamento não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Pagamento obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PAYMENT", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Payment.create(req.body);
            
            // Populate the created item to return complete data
            const populatedItem = await Payment.findById(newItem._id)
                .populate('serviceId', 'item description price')
                .populate('clientId', 'fullName email phone');
            
            res.status(201).json({
                message: "Pagamento criado com sucesso",
                data: populatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_CREATE_PAYMENT", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Payment.findByIdAndUpdate(
                id, 
                req.body, 
                { new: true, runValidators: true }
            )
            .populate('serviceId', 'item description price')
            .populate('clientId', 'fullName email phone');
            
            if (!updatedItem) {
                return res.status(404).json({ 
                    message: 'Pagamento não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Pagamento atualizado com sucesso",
                data: updatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_UPDATE_PAYMENT", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Payment.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ 
                    message: 'Pagamento não encontrado' 
                });
            }
            
            res.status(200).json({
                message: "Pagamento deletado com sucesso"
            });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_PAYMENT", error);
        }
    }

    // Método adicional para buscar pagamentos por status
    async getByStatus(req, res) {
        try {
            const { status } = req.params;
            const items = await Payment.find({ status, deleted: false })
                .populate('serviceId', 'item description price')
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: `Pagamentos com status '${status}' obtidos com sucesso`,
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PAYMENTS_BY_STATUS", error);
        }
    }

    // Método adicional para buscar pagamentos por cliente
    async getByClient(req, res) {
        try {
            const { clientId } = req.params;
            const items = await Payment.find({ clientId, deleted: false })
                .populate('serviceId', 'item description price')
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: "Pagamentos do cliente obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PAYMENTS_BY_CLIENT", error);
        }
    }

    // Método adicional para buscar pagamentos por serviço
    async getByService(req, res) {
        try {
            const { serviceId } = req.params;
            const items = await Payment.find({ serviceId, deleted: false })
                .populate('serviceId', 'item description price')
                .populate('clientId', 'fullName email phone');
            
            res.status(200).json({
                message: "Pagamentos do serviço obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_PAYMENTS_BY_SERVICE", error);
        }
    }
}

export default PaymentsController;
