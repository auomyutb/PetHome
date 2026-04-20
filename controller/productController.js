const Product = require("../models/Product")

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////👌DONE CHECK THIS IN INSOMNIA ////////////////////////

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.json({ message: "product deleted" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getProducts, createProduct, updateProduct, deleteProduct }
