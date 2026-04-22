const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

router.post("/add", cartController.addToCart)
router.get("/:user", cartController.getUserCart)
router.post("/remove", cartController.removeFromCart)
router.delete("/clear/:user", cartController.clearCart)

module.exports = router
