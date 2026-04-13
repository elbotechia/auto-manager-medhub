import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const ProductSchema = new mongoose.Schema({
  code: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  brand: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  category: {
    type: String, 
    required: true,
    trim: true,
    enum: ['Óleo', 'Filtro', 'Pneu', 'Bateria', 'Peças', 'Acessórios', 'Ferramentas', 'Outros']
  },
  quantity: {
    type: Number, 
    required: true,
    min: 0,
    default: 0
  },
  unitPrice: {
    type: Number, 
    required: true,
    min: 0.01
  },
  costPrice: {
    type: Number, 
    required: false,
    min: 0
  },
  minStock: {
    type: Number,
    required: false,
    min: 0,
    default: 5
  },
  maxStock: {
    type: Number,
    required: false,
    min: 0,
    default: 1000
  },
  supplier: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: false,
    maxlength: 500
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator: function(url) {
        return !url || /^https?:\/\/.+/.test(url);
      },
      message: "URL da imagem inválida"
    }
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  // Histórico de movimentações
  movements: [{
    type: {
      type: String,
      enum: ['entrada', 'saida', 'ajuste'],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true,
      maxlength: 200
    },
    previousStock: {
      type: Number,
      required: true
    },
    newStock: {
      type: Number,
      required: true
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees',
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});

// Middleware para validar estoque
ProductSchema.pre('save', function(next) {
  if (this.quantity < 0) {
    next(new Error('Quantidade não pode ser negativa'));
  }
  
  if (this.maxStock && this.minStock && this.maxStock < this.minStock) {
    next(new Error('Estoque máximo deve ser maior que o mínimo'));
  }
  
  next();
});

// Método para adicionar movimentação
ProductSchema.methods.addMovement = function(type, quantity, reason, employeeId) {
  const previousStock = this.quantity;
  let newStock;
  
  if (type === 'entrada') {
    newStock = previousStock + Math.abs(quantity);
  } else if (type === 'saida') {
    newStock = previousStock - Math.abs(quantity);
  } else { // ajuste
    newStock = quantity;
  }
  
  if (newStock < 0) {
    throw new Error('Estoque insuficiente');
  }
  
  this.movements.push({
    type,
    quantity: Math.abs(quantity),
    reason,
    previousStock,
    newStock,
    employeeId
  });
  
  this.quantity = newStock;
};

ProductSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Product = mongoose.model('Products', ProductSchema);
