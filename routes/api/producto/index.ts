import { Router } from "express";
import { productosControladora } from '../../../controladora/producto'

// se instancia un nuevo router el cual se utilizara para nestear rutas.
const router = Router();
// cuando la url coincida con esta ruta, se ejecuta el codigo dentro de la funcion.
// en este caso la url deberia ser --> localhost:PORT/api/blogs/ con un metodo GET.
router.post("/newProduct", productosControladora.newProducto);

router.get("/getAllProducts", productosControladora.getTodosProductos);

router.get("/getProductByID", productosControladora.getProductoByID);

// se exporta el router para poder enlazarlo con las rutas que estan dentro de /api.
export default router;