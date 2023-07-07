const User = require('../models/user.model')

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    catch (error) {
        res.json({ fatal: error.message })
    }
}

const buyProduct = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const user = await User.findById(userId)
        user.products.push(productId)
        //aqui guardo los cambios
        await user.save()

        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }

}

const getAll = async (req, res) => {
    try {//.populate te manda todos los datos del producto
        const users = await User.find().populate('products')
        res.json(users)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}




module.exports = {
    createUser, buyProduct, getAll

}