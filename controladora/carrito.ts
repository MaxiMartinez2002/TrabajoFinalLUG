import { Request, Response } from "express";
import cart from "../modelo/carrito";
import product from "../modelo/producto"


export const carritoControladora = {

  newCarrito: async (req: Request, res: Response) => {

    const newCarrito = new cart({ ...req.body })
    newCarrito.save()
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  getCarrito: async (req: Request, res: Response) => {

    cart.find({ _id: req.body.idCart })
      .populate('productos.producto')
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  getTodosCarritos: async (req: Request, res: Response) => {

    cart.find({})
      .populate('productos.producto')
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  addProducto: async (req: Request, res: Response) => {
    cart.findById(req.body.idCart)
      .populate('productos.producto')
      .populate('productos.producto.detail')
      .then((productoID) => {

        if (!productoID) {
          return res.status(404).send()
        } else {
          const newProducto = {
            "producto": req.body.productoID,
            "amount": 0
          }
          productoID.productos.push(newProducto)

          if (productoID.status == 'New') {
            productoID.status = 'InProgress'
          }

          productoID.save()
          res.send(productoID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  deleteProducto: async (req: Request, res: Response) => {

    cart.findById(req.body.idCarrito)
      .then((carritoData) => {

        if (!carritoData) {
          return res.status(404).send()
        } else {
          carritoData?.productos.splice(req.body.idDeleteProducto, 1)
          carritoData.save()
          res.send(carritoData)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  moreProducto: async (req: Request, res: Response) => {
    cart.findById(req.body.idCarrito)

      .then((productoID) => {
        if (!productoID) {
          return res.status(404).send()
        } else {
          productoID.productos[req.body.positionProducto].amount += 1
          productoID.save()
          res.send(productoID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  lessProducto: async (req: Request, res: Response) => {
    cart.findById(req.body.idCarrito)

      .then((productoID) => {
        if (!productoID) {
          return res.status(404).send()
        } else {
          productoID.productos[req.body.positionProducto].amount -= 1
          productoID.save()
          res.send(productoID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  setAmount: async (req: Request, res: Response) => {
    cart.findById(req.body.idCarrito)

      .then((productoID) => {
        if (!productoID) {
          return res.status(404).send()
        } else {
          productoID.productos[req.body.positionProducto].amount = req.body.amount
          productoID.save()
          res.send(productoID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  buyCarrito: async (req: Request, res: Response) => {

    let total: number = 0

    cart.findById(req.body.idCarrito)
      .then((carritoFound) => {

        if (!carritoFound) {
          return res.status(404).send()
        } else {

          carritoFound.productos.forEach(async productoFind => {
            const id = productoFind.producto?.toString()
            const amount: number = productoFind.amount

            const productoFound = await product.findById(id)

            const stock = productoFound?.stock
            if (stock && stock.valueOf() < amount?.valueOf()) {
              console.log(`PRODUCTO: ${stock}, STOCK: ${stock}, AMOUNT: ${amount}`)
              return res.status(500).send({ message: `Error: el producto ${productoFound.desc} tiene stock ${stock} y se quiere comprar ${amount} unidades` })
            } else {
              if (stock && productoFound?.price) {
                productoFound.stock = stock - amount
                total += amount * productoFound.price
                
              }
            }
            
            carritoFound.total = total
            carritoFound.status = 'Bought'

            carritoFound.productos.forEach((amount) =>{
              amount.amount = 0
            })

            const promise = new Promise(() => {
              productoFound?.save()
            })

            promise.then(() =>{
              carritoFound.save()
            })

            try {   
              res.send(carritoFound)
              console.log(total)
            } catch (error) {
              console.log(error)
            }
          })
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },
};