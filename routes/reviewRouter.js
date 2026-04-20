const express = require("express")
const router = express.Router()

const reviewController = require("../controller/reviewController")

router.post("/", reviewController.createReview)

router.get("/:pet", reviewController.getPetReviews)

router.delete("/:review", reviewController.deleteReview)

module.exports = router
