const express = require('express')
const OrderCard = require('../models/cart')
const { ensureAdmin, ensureSession } = require('./middleware')

const router = express.Router()

router.get('/get_product/:_id', async (req, res) => {
  try {
    const product = await OrderCard.findOne({
      _id: req.params._id,
    })

    return res.status(200).send(product)
  } catch (e) {
    res.statusMessage = 'Product not created!'
    return res.status(400).end()
  }
})

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

router.post('/list_products', async (req, res) => {
  try {
    const productList = await OrderCard.find({})

    return res.status(200).send(productList.map(product => ({
      _id: product._id,
      name: product.name,
      dimensions: product.dimensions,
      imageSrc: product.imageSrc,
      sizes: product.sizes,
      price: product.price,
      releaseYear: product.releaseYear,
      releaseMonth: product.releaseMonth,
      inStock: product.inStock,
      detail: product.detail
    })))
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

    return res.status(200).send({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      dimensions: updatedProduct.dimensions,
      imageSrc: updatedProduct.imageSrc,
      sizes: updatedProduct.sizes,
      price: updatedProduct.price,
      releaseYear: updatedProduct.releaseYear,
      releaseMonth: updatedProduct.releaseMonth,
      inStock: updatedProduct.inStock,
      detail: updatedProduct.detail
    })
  } catch (e) {
    res.statusMessage = 'Products not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_product/:_id', ensureAdmin, async (req, res) => {
  try {
    const deletedProduct = await OrderCard.findOneAndRemove({
      _id: req.params._id,
    })

    return res.status(200).send('Product is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Product not deleted')
  }
})

module.exports = router
