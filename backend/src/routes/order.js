const express = require('express')
const Order = require('../models/order')
const { ensureAdmin, ensureSession } = require('./middleware')

const router = express.Router()

router.post('/create_order', ensureSession, async (req, res) => {
  try {
    const createdOrder = await OrderCard.create({
      ...req.body,
    })

    return res.status(200).send(createdOrder)
  } catch (e) {
    res.statusMessage = 'Order not created!'
    return res.status(400).end()
  }
})

router.post('/list_orders', ensureSession, async (req, res) => {
  try {
    const orderList = await OrderCard.find({})

    return res.status(200).send(orderList)
  } catch (e) {
    res.statusMessage = 'Orders not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_order', ensureAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      _id: req.body._id,
    })

    return res.status(200).send('Order is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Order not deleted')
  }
})
module.exports = router
