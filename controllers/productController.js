const Product = require("../models/Product")

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

/////////////////////
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

/////////////////////

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.json(product)
  } catch (error) {
    res.status(500).jso(error)
  }
}

///////////

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    res.json({ message: "Product deleted" })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { createProduct, getProducts, updateProduct, deleteProduct }
