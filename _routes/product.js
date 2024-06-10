const express = require('express')
const { addProduct, getProduct, deleteProduct, getSingalProduct, updateProduct, searchProduct } = require('../_service/Product')
const router = express.Router()
const auth = require('../middleware/auth')

router.post("/product", auth, addProduct)
router.get("/product", auth, getProduct)
router.delete("/product/:id", auth, deleteProduct)
router.get("/product/:id", auth, getSingalProduct)
router.put("/product/:id", auth, updateProduct)
router.get("/product/search/:key", auth, searchProduct)

module.exports = router