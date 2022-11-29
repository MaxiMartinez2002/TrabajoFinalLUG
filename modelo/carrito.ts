import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const carritoSchema = new Schema({
  productos: [{
    producto: {type: Schema.Types.ObjectId, ref: "Producto"},
    amount: {type: Number, default: 0} 
  }],
  status: {type: String, default: 'New'},
  total: {type: Number, default: 0}
});
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default model("Carrito", carritoSchema);