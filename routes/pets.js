const express = require('express')
const router = express.Router()
const petController = require('../controllers/pets')
const verifyToken = require('../middleware/verifyToken')

router.get('/pets', petController.getAllPets)
router.get('/dogs', petController.getDogs)
router.get('/cats', petController.getCats)

router.post('/pets', verifyToken, petController.createPet)
router.put('/pets/:id', verifyToken, petController.updatePet)
router.delete('/pets/:id', verifyToken, petController.deletePet)

module.exports = router
