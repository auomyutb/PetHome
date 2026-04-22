const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const donationController = require('../controllers/donationsController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router.get('/', donationController.getDonations)
router.post('/', upload.single('transferImage'), donationController.createDonation)
router.delete('/:id', donationController.deleteDonation)

module.exports = router
