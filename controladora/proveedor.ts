import { Request, Response } from "express";
import proveedor from "../modelo/proveedor";


export const proveedorControladora = {

    newProveedor: async (req:Request, res:Response) => {
      const newProveedor = new proveedor({...req.body})
      newProveedor.save()
      res.send(newProveedor)  
    },

    getTodosProveedores: async (req:Request, res:Response) => {
        proveedor.find()
        .then((userAuthor) => {
            if(!userAuthor){
                return res.status(404).send()
            }
            res.send(userAuthor)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },
};