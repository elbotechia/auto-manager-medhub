import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const PaymentSchema = new mongoose.Schema({
  method: {
    type: String, 
    required: true,
    enum: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Transferência Bancária', 'Cheque'],
    default: 'Dinheiro'
  },
  status: {
    type: String, 
    required: true,
    enum: ['Pendente', 'Pago', 'Cancelado', 'Estornado'],
    default: 'Pendente'
  },
  transactionId: {
    type: String, 
    required: false,
    unique: true,
    sparse: true // Permite múltiplos valores null/undefined
  },
  quantity: {
    type: Number, 
    required: true,
    min: 1,
    default: 1
  },
  baseAmount: {
    type: Number, 
    required: true,
    min: 0.01
  },
  discount: {
    type: Number, 
    required: false,
    min: 0,
    default: 0.00
  },
  totalAmount: {
    type: Number, 
    required: true,
    min: 0.01
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Services',
    required: false
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: false
  },
  notes: {
    type: String,
    required: false,
    maxlength: 500
  }
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para calcular totalAmount automaticamente
PaymentSchema.pre('save', function(next) {
  if (this.isModified('baseAmount') || this.isModified('discount') || this.isModified('quantity')) {
    const subtotal = this.baseAmount * this.quantity;
    this.totalAmount = subtotal - this.discount;
  }
  next();
});

// Validação customizada para garantir que o totalAmount seja correto
PaymentSchema.path('totalAmount').validate(function(value) {
  const expectedTotal = (this.baseAmount * this.quantity) - this.discount;
  return Math.abs(value - expectedTotal) < 0.01; // Tolerância para problemas de ponto flutuante
}, 'Total amount must equal (baseAmount * quantity) - discount');

PaymentSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Payment = mongoose.model('Payments', PaymentSchema);
