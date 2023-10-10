const express = require("express");
const Order = require("../models/order");
const { ensureAdmin, ensureSession } = require("./middleware");

const router = express.Router();

router.post("/create_order", ensureSession, async (req, res) => {
  try {
    const createdOrder = await Order.create(
      Array.isArray(req.body)
        ? req.body.map((item) => ({ ...item, orderDate: new Date() }))
        : { ...req.body, orderDate: new Date() }
    );

    return res.status(200).send(createdOrder);
  } catch (e) {
    res.statusMessage = "Order not created!";
    console.log(e);
    return res.status(400).end();
  }
});

router.get("/list_orders", ensureSession, async (req, res) => {
  try {
    const orderList = await Order.find({})
      .populate("user", "_id firstName lastName")
      .populate("product", "_id name");

    return res.status(200).send(orderList);
  } catch (e) {
    console.log(e);
    res.statusMessage = "Orders not found!";
    return res.status(400).end();
  }
});

router.delete("/delete_order/:_id", ensureAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndRemove({
      _id: req.params._id,
    });

    return res.status(200).send("Order is deleted");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Order not deleted");
  }
});
module.exports = router;
