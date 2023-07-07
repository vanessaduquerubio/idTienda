const router = require('express').Router()
const usersController = require('../../controllers/users.controlers')

router.post('/register', usersController.createUser)
router.put('/:userId/buy/:productId', usersController.buyProduct)
router.get('/', usersController.getAll)



module.exports = router