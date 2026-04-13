import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const ServicesSchema = new mongoose.Schema({
  item: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, 
    validate:{
        validator: (req)=>{
            return true;
        },
        message: "ERROR_URL"
    }
  },
  price: {type: Number, required: true},
  category: {type: String, required: true},
  }
  ,{
    timestamps: true,
    versionKey: false
});

ServicesSchema.plugin(MongooseDelete, { overrideMethods: 'all',deletedAt: true}); 
export const Service = mongoose.model('Services' ,ServicesSchema);