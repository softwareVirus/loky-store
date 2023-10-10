const express = require('express')
const OrderCard = require('../models/cart')
const { ensureAdmin } = require('./middleware')

const router = express.Router()

router.post('/create_product', ensureAdmin, async (req, res) => {
  try {
    const createdProduct = await OrderCard.create({
      ...req.body,
    })

    return res.status(200).send(createdProduct)
  } catch (e) {
    res.statusMessage = 'Product not created!'
    return res.status(400).end()
  }
})

router.post('/list_products', ensureAdmin, async (req, res) => {
  try {
    const productList = await OrderCard.find({})

    return res.status(200).send(productList)
  } catch (e) {
    res.statusMessage = 'Products not found!'
    return res.status(400).end()
  }
})

router.put('/update_product', ensureAdmin, async (req, res) => {
  try {
    const updatedProduct = await OrderCard.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        ...req.body,
      }
    )
    if (updatedProduct === null) throw new Error('Product not found!')

    return res.status(200).send(updatedProduct)
  } catch (e) {
    res.statusMessage = 'Products not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_product', ensureAdmin, async (req, res) => {
  try {
    const deletedProduct = await OrderCard.findOneAndDelete({
      _id: req.body._id,
    })

    return res.status(200).send('Product is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Product not deleted')
  }
})

module.exports = router
