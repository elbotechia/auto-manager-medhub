import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import { handlePasswordHash } from "../../utils/handlePassword.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
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
  password: {
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String, 
    required: true,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
    required: function() {
      return this.role === 'employee';
    }
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin: {
    type: Date,
    required: false
  },
  permissions: {
    canViewProducts: { type: Boolean, default: true },
    canManageProducts: { type: Boolean, default: false },
    canViewClients: { type: Boolean, default: true },
    canManageClients: { type: Boolean, default: false },
    canViewSales: { type: Boolean, default: true },
    canManageSales: { type: Boolean, default: false },
    canViewFinancials: { type: Boolean, default: false }, // Apenas admin
    canManageEmployees: { type: Boolean, default: false }, // Apenas admin
    canViewReports: { type: Boolean, default: false } // Apenas admin
  }
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para hash da senha antes de salvar
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await handlePasswordHash(this.password);
  }
  
  // Definir permissões baseadas no role
  if (this.isModified('role')) {
    if (this.role === 'admin') {
      this.permissions = {
        canViewProducts: true,
        canManageProducts: true,
        canViewClients: true,
        canManageClients: true,
        canViewSales: true,
        canManageSales: true,
        canViewFinancials: true,
        canManageEmployees: true,
        canViewReports: true
      };
    } else {
      this.permissions = {
        canViewProducts: true,
        canManageProducts: false,
        canViewClients: true,
        canManageClients: false,
        canViewSales: true,
        canManageSales: false,
        canViewFinancials: false,
        canManageEmployees: false,
        canViewReports: false
      };
    }
  }
  
  next();
});

UserSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const User = mongoose.model('Users', UserSchema);
