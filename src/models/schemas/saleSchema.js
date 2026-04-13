import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const SaleSchema = new mongoose.Schema({
  date: {
    type: Date, 
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['Pendente', 'Confirmada', 'Concluída', 'Cancelada'],
    default: 'Pendente'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0.01
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicles',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
    required: false
  },
  serviceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Services',
    required: true
  }],
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tickets',
    required: false
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payments',
    required: false
  },
  discount: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  tax: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  observations: {
    type: String,
    required: false,
    maxlength: 500
  },
  // Array de itens da venda com quantidades
  items: [{
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0.01
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0.01
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para calcular o valor total automaticamente
SaleSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    const itemsTotal = this.items.reduce((total, item) => {
      item.totalPrice = item.quantity * item.unitPrice;
      return total + item.totalPrice;
    }, 0);
    
    this.totalAmount = itemsTotal + (this.tax || 0) - (this.discount || 0);
  }
  next();
});

SaleSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Sale = mongoose.model('Sales', SaleSchema);
