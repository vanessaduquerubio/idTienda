const Product = require('../models/product.model')


const getProducts = async (req, res) => {
    //para recuperar todos los productos es como el select*from products de mySQL
    try {
        const productos = await Product.find()
        res.json(productos)
    } catch (error) {
        res.json(error.message)
    }
}
const createProducts = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        res.json(error.message)
    }
}
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.json([product])
    } catch (error) {
        res.json(error.message)
    }
}

const Update = async (req, res) => {
    try {
        const { productId } = req.params
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true },)
        res.json(updatedProduct)
    } catch (error) {
        res.json(error.message)
    }
}
const deleteById = async (req, res) => {
    try {
        const { productId } = req.params
        const deletedProduct = await Product.findByIdAndDelete(productId)
        res.json(deletedProduct)
    } catch (error) {
        res.json(error.message)
    }

}

module.exports = { getProducts, createProducts, getProductById, Update, deleteById }