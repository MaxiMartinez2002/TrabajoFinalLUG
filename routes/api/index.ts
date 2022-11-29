import { Router } from "express";
import carritoRoutes from "./carrito";
import productoRoutes from "./producto";
import proveedorRoutes from "./proveedor";

const router = Router();
// todas las rutas que lleguen a /api/blogs, ejecutaran lo que se exporto de blogRoutes
router.use("/carrito", carritoRoutes);
router.use("/producto", productoRoutes);
router.use("/proveedor", proveedorRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api

export default router;
