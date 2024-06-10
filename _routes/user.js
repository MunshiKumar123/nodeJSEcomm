const express = require('express')
const { userRegister, userLogin, getUserList } = require('../_service/User')
const router = express.Router()

router.post("/register", userRegister)
router.get("/userList", getUserList)
router.post("/login", userLogin)

module.exports = router