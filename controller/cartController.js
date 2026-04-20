const Cart = require("../models/Cart")
const Product = require("../models/Product")

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const getUserCart = async (req, res) => {
  try {
    const { user } = req.params
    const cart = await Cart.findOne({ user }).populate("products.product")
    res.json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body

    let cart = await Cart.findOne({ user })

    if (!cart) {
      cart = await Cart.create({
        user,
        products: [],
      })
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === product
    )

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity
    } else {
      cart.products.push({
        product,
        quantity,
      })
    }

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const removeFromCart = async (req, res) => {
  try {
    const { user, product } = req.body

    const cart = await Cart.findOne({ user })

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== product
    )

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const clearCart = async (req, res) => {
  try {
    const { user } = req.params
    await Cart.findOneAndDelete({ user })
    res.json({ message: "Cart cleared" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

module.exports = { getUserCart, addToCart, removeFromCart, clearCart }
