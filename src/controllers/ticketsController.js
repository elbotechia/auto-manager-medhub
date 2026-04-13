import { Ticket } from "../models/schemas/ticketSchema.js";
import { handleHttpError } from "../errors/handleError.js";

class TicketsController {
    constructor() {}

    async getItems(req, res) {
        try {
            const items = await Ticket.find({ deleted: false })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category')
                .populate('paymentId', 'method status totalAmount');
            
            res.status(200).json({
                message: "Tickets obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_TICKETS", error);
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Ticket.findById(id)
                .populate('clientId', 'fullName email phone address')
                .populate('vehicleId', 'make model year licensePlate color')
                .populate('employeeId', 'name role phone email')
                .populate('serviceIds', 'item description price category')
                .populate('paymentId');
            
            if (!item) {
                return res.status(404).json({ message: 'Ticket não encontrado' });
            }
            
            res.status(200).json({
                message: "Ticket obtido com sucesso",
                data: item
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_TICKET", error);
        }
    }

    async createItem(req, res) {
        try {
            const newItem = await Ticket.create(req.body);
            const populatedItem = await Ticket.findById(newItem._id)
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category');
            
            res.status(201).json({
                message: "Ticket criado com sucesso",
                data: populatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_CREATE_TICKET", error);
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Ticket.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category')
                .populate('paymentId', 'method status totalAmount');
            
            if (!updatedItem) {
                return res.status(404).json({ message: 'Ticket não encontrado' });
            }
            
            res.status(200).json({
                message: "Ticket atualizado com sucesso",
                data: updatedItem
            });
        } catch (error) {
            handleHttpError(res, "ERROR_UPDATE_TICKET", error);
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Ticket.delete({ _id: id });
            
            if (!deletedItem || deletedItem.deletedCount === 0) {
                return res.status(404).json({ message: 'Ticket não encontrado' });
            }
            
            res.status(200).json({ message: "Ticket deletado com sucesso" });
        } catch (error) {
            handleHttpError(res, "ERROR_DELETE_TICKET", error);
        }
    }

    async getByStatus(req, res) {
        try {
            const { status } = req.params;
            const items = await Ticket.find({ status, deleted: false })
                .populate('clientId', 'fullName email phone')
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role');
            
            res.status(200).json({
                message: `Tickets com status '${status}' obtidos com sucesso`,
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_TICKETS_BY_STATUS", error);
        }
    }

    async getByClient(req, res) {
        try {
            const { clientId } = req.params;
            const items = await Ticket.find({ clientId, deleted: false })
                .populate('vehicleId', 'make model year licensePlate')
                .populate('employeeId', 'name role')
                .populate('serviceIds', 'item price category');
            
            res.status(200).json({
                message: "Tickets do cliente obtidos com sucesso",
                data: items
            });
        } catch (error) {
            handleHttpError(res, "ERROR_GET_TICKETS_BY_CLIENT", error);
        }
    }
}

export default TicketsController;
