import { Request, Response } from "express";
import producto from "../modelo/producto";


export const productosControladora = {

    newProducto: async (req:Request, res:Response) => {
      const newProducto = new producto({...req.body})
      newProducto.save()
      res.send(newProducto)  
    },

    getTodosProductos: async (req:Request, res:Response) => {
        producto.find()
        .then((producto) => {
            if(!producto){
                return res.status(404).send()
            }
            res.send(producto)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },

    getProductoByID: async (req:Request, res:Response) => {
        producto.find()
        .then((producto) => {
            if(!producto){
                return res.status(404).send()
            }
            res.send(producto)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },
};