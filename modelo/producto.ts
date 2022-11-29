import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const productoSchema = new Schema({
  name: String,  
  price: Number,
  desc: String,
  stock: {type: Number, default: 0},
  proveedor: { type: Schema.Types.ObjectId, ref: "Proveedor" },
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Producto", productoSchema);