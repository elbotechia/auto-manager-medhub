import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  role: {
    type: String, 
    required: true,
    trim: true,
    enum: ['Mecânico', 'Gerente', 'Atendente', 'Supervisor', 'Técnico', 'Auxiliar'],
    default: 'Mecânico'
  },
  email: {
    type: String, 
    required: false,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        return !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "Email inválido"
    }
  },
  phone: {
    type: String, 
    required: false,
    trim: true,
    validate: {
      validator: function(phone) {
        return !phone || /^[\d\s\-\(\)\+]{10,15}$/.test(phone);
      },
      message: "Telefone inválido"
    }
  },
  cpf: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    validate: {
      validator: function(cpf) {
        return !cpf || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
      },
      message: "CPF deve estar no formato XXX.XXX.XXX-XX"
    }
  },
  salary: {
    type: Number,
    required: false,
    min: 0
  },
  hireDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  specializations: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    required: false,
    maxlength: 500
  }
}, {
  timestamps: true,
  versionKey: false
});

EmployeeSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Employee = mongoose.model('Employees', EmployeeSchema);
