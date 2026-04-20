const express = require("express")
const router = express.Router()

const replyReviewController = require("../controller/replyReviewController.js")

router.get("/:review", replyReviewController.getReply)

router.post("/", replyReviewController.createReply)

router.delete("/:id", replyReviewController.deleteReply)

module.exports = router
