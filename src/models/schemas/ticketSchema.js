import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const TicketSchema = new mongoose.Schema({
  issue: {
    type: String, 
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  status: {
    type: String, 
    required: true,
    enum: ['Pendente', 'Em Andamento', 'Aguardando Peças', 'Concluído', 'Cancelado'],
    default: 'Pendente'
  },
  priority: {
    type: String,
    required: false,
    enum: ['Baixa', 'Média', 'Alta', 'Urgente'],
    default: 'Média'
  },
  description: {
    type: String,
    required: false,
    maxlength: 1000
  },
  diagnosis: {
    type: String,
    required: false,
    maxlength: 1000
  },
  solution: {
    type: String,
    required: false,
    maxlength: 1000
  },
  estimatedCost: {
    type: Number,
    required: false,
    min: 0
  },
  actualCost: {
    type: Number,
    required: false,
    min: 0
  },
  estimatedTime: {
    type: Number, // em horas
    required: false,
    min: 0
  },
  actualTime: {
    type: Number, // em horas
    required: false,
    min: 0
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
    ref: 'Services'
  }],
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payments',
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  completionDate: {
    type: Date,
    required: false
  },
  notes: {
    type: String,
    required: false,
    maxlength: 1000
  }
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para definir startDate quando status muda para "Em Andamento"
TicketSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'Em Andamento' && !this.startDate) {
      this.startDate = new Date();
    }
    if (this.status === 'Concluído' && !this.completionDate) {
      this.completionDate = new Date();
    }
  }
  next();
});

TicketSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Ticket = mongoose.model('Tickets', TicketSchema);
