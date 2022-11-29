import { Router } from "express";
import { carritoControladora } from '../../../controladora/carrito';

// se instancia un nuevo router el cual se utilizara para nestear rutas.
const router = Router();
// cuando la url coincida con esta ruta, se ejecuta el codigo dentro de la funcion.
// en este caso la url deberia ser --> localhost:PORT/api/blogs/ con un metodo GET.
router.post("/newCart", carritoControladora.newCarrito);

router.get("/getCart", carritoControladora.getCarrito);

router.get("/getAllCarts", carritoControladora.getTodosCarritos);

router.post("/addProduct", carritoControladora.addProducto);

router.post("/deleteProduct", carritoControladora.deleteProducto);

router.patch("/moreProduct", carritoControladora.moreProducto);

router.patch("/lessProduct", carritoControladora.lessProducto);

router.patch("/setAmount", carritoControladora.setAmount);

router.post("/buyCart", carritoControladora.buyCarrito)


// se exporta el router para poder enlazarlo con las rutas que estan dentro de /api.
export default router;
