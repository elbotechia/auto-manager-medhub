import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const InvoiceSchema = new mongoose.Schema({
  number: {
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  series: {
    type: String,
    required: true,
    default: '001'
  },
  type: {
    type: String,
    required: true,
    enum: ['venda', 'devolucao', 'troca'],
    default: 'venda'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: true
  },
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sales',
    required: false
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services',
      required: false
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
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
    },
    discount: {
      type: Number,
      required: false,
      min: 0,
      default: 0
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
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
  total: {
    type: Number,
    required: true,
    min: 0.01
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Transferência Bancária', 'Cheque']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pendente', 'Pago', 'Cancelado'],
    default: 'Pendente'
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false
  },
  notes: {
    type: String,
    required: false,
    maxlength: 500
  },
  status: {
    type: String,
    required: true,
    enum: ['Emitida', 'Cancelada', 'Inutilizada'],
    default: 'Emitida'
  }
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para calcular totais automaticamente
InvoiceSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    // Calcular total de cada item
    this.items.forEach(item => {
      item.totalPrice = (item.unitPrice * item.quantity) - (item.discount || 0);
    });
    
    // Calcular subtotal
    this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Calcular total final
    this.total = this.subtotal + (this.tax || 0) - (this.discount || 0);
  }
  next();
});

// Gerar próximo número da nota fiscal
InvoiceSchema.statics.getNextInvoiceNumber = async function() {
  const lastInvoice = await this.findOne({}, {}, { sort: { 'number': -1 } });
  if (!lastInvoice) {
    return '000001';
  }
  
  const lastNumber = parseInt(lastInvoice.number);
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return nextNumber;
};

InvoiceSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Invoice = mongoose.model('Invoices', InvoiceSchema);
