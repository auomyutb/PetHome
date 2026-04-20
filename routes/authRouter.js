const express = require("express")
const router = express.Router()
const authController = require("../controller/authController")
const middleware = require("../middleware")
////////////////////////////////////////////

router.post("/register", authController.Register)

router.post("/login", authController.Login)

router.put(
  "/update/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authController.UpdatePassword
)

////////////////////////////////////////////

module.exports = router
