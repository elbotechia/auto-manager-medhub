import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const FinancialSchema = new mongoose.Schema({
  type: {
    type: String, 
    required: true,
    enum: ['receita', 'despesa'],
  },
  category: {
    type: String, 
    required: true,
    enum: [
      // Receitas
      'vendas', 'servicos', 'outras_receitas',
      // Despesas  
      'salarios', 'energia', 'agua', 'aluguel', 'fornecedores', 'impostos', 'combustivel', 'manutencao', 'outras_despesas'
    ]
  },
  description: {
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  amount: {
    type: Number, 
    required: true,
    min: 0.01
  },
  date: {
    type: Date, 
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: ['pendente', 'pago', 'recebido', 'cancelado'],
    default: function() {
      return this.type === 'receita' ? 'recebido' : 'pago';
    }
  },
  paymentMethod: {
    type: String,
    required: false,
    enum: ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Transferência Bancária', 'Cheque', 'Débito Automático']
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
    required: false
  },
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sales',
    required: false
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices',
    required: false
  },
  supplier: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100
  },
  document: {
    type: String, // Número da nota fiscal, recibo, etc.
    required: false,
    trim: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrenceType: {
    type: String,
    enum: ['mensal', 'bimestral', 'trimestral', 'semestral', 'anual'],
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

// Índices para consultas por período
FinancialSchema.index({ date: 1, type: 1 });
FinancialSchema.index({ category: 1, date: 1 });

// Métodos estáticos para relatórios
FinancialSchema.statics.getMonthlyReport = async function(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  
  const result = await this.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        deleted: false
      }
    },
    {
      $group: {
        _id: { type: '$type', category: '$category' },
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        categories: {
          $push: {
            category: '$_id.category',
            total: '$total',
            count: '$count'
          }
        },
        totalByType: { $sum: '$total' }
      }
    }
  ]);
  
  return result;
};

FinancialSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Financial = mongoose.model('Financials', FinancialSchema);
