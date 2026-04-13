import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const ClientSchema = new mongoose.Schema({
  fullName: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "Email inválido"
    }
  },
  phone: {
    type: String, 
    required: true,
    trim: true,
    validate: {
      validator: function(phone) {
        return /^[\d\s\-\(\)\+]{10,15}$/.test(phone);
      },
      message: "Telefone inválido"
    }
  },
  address: {
    type: String, 
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200
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
  birthDate: {
    type: Date,
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

ClientSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Client = mongoose.model('Clients', ClientSchema);
