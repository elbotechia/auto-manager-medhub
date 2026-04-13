import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  model: {
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  year: {
    type: Number, 
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  licensePlate: {
    type: String, 
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    validate: {
      validator: function(plate) {
        // Formato brasileiro: ABC-1234 ou ABC1D23 (Mercosul)
        return /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate);
      },
      message: "Placa inválida. Use formato ABC-1234 ou ABC1D23"
    }
  },
  color: {
    type: String,
    required: false,
    trim: true,
    maxlength: 30
  },
  engineSize: {
    type: String,
    required: false,
    trim: true,
    maxlength: 20
  },
  fuelType: {
    type: String,
    required: false,
    enum: ['Gasolina', 'Etanol', 'Flex', 'Diesel', 'GNV', 'Elétrico', 'Híbrido'],
    default: 'Flex'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    required: true
  },
  annotations: {
    type: String,
    required: false,
    maxlength: 1000
  }
}, {
  timestamps: true,
  versionKey: false
});

VehicleSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true }); 

export const Vehicle = mongoose.model('Vehicles', VehicleSchema);
