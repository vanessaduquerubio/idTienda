const router = require('express').Router()
const productsController = require('../../controllers/products.controller')

router.get('/', productsController.getProducts)
router.get('/:productId', productsController.getProductById)
router.post('/', productsController.createProducts)
router.put('/:productId', productsController.Update)
router.delete('/:productId', productsController.deleteById)








module.exports = router
