import { Sale } from "../models/schemas/saleSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class SalesController {
    constructor() {}

    async getItems(req, res) {
        try {
            const items = await Sale.find({ deleted: false })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category')
                .populate('ticketId', 'issue status')
                .populate('paymentId', 'method status totalAmount')
                .populate('items.serviceId', 'item price category');
            
            res.status(200).json({
                message: "Vendas obtidas com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_SALES", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Sale.findById(id)
                .populate('clientId', 'fullName email phone address')
                .populate('vehicleId', 'make model year licensePlate color')
                .populate('employeeId', 'name role phone email')
                .populate('serviceIds', 'item description price category')
                .populate('ticketId')
                .populate('paymentId')
                .populate('items.serviceId', 'item description price category');
            
            if (!item) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            
            res.status(200).json({
                message: "Venda obtida com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_SALE", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Sale.create(req.body);
            const populatedItem = await Sale.findById(newItem._id)
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category')
                .populate('items.serviceId', 'item price category');
            
            res.status(201).json({
                message: "Venda criada com sucesso",
                data: populatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_CREATE_SALE", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Sale.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category')
                .populate('ticketId', 'issue status')
                .populate('paymentId', 'method status totalAmount')
                .populate('items.serviceId', 'item price category');
            
            if (!updatedItem) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            
            res.status(200).json({
                message: "Venda atualizada com sucesso",
                data: updatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_UPDATE_SALE", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Sale.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            
            res.status(200).json({ message: "Venda deletada com sucesso" });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_SALE", error);
        }
    }

    async getByStatus(req, res) {
        try {
            const { status } = req.params;
            const items = await Sale.find({ status, deleted: false })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role');
            
            res.status(200).json({
                message: `Vendas com status '${status}' obtidas com sucesso`,
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_SALES_BY_STATUS", error);
        }
    }

    async getByClient(req, res) {
        try {
            const { clientId } = req.params;
            const items = await Sale.find({ clientId, deleted: false })
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category');
            
            res.status(200).json({
                message: "Vendas do cliente obtidas com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_SALES_BY_CLIENT", error);
        }
    }

    async getByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const filter = { deleted: false };
            
            if (startDate && endDate) {
                filter.date = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                };
            }
            
            const items = await Sale.find(filter)
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role');
            
            res.status(200).json({
                message: "Vendas por período obtidas com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_SALES_BY_DATE", error);
        }
    }
}

export default SalesController;
