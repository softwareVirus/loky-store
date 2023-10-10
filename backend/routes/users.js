const express = require("express");
const User = require("../models/user");
const { ensureSession, ensureAdmin } = require("./middleware");

const router = express.Router();

router.get("/get_user/:id", ensureAdmin, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    console.log(user);
    if (user === null) throw new Error("User List is empty");

    return res.status(200).send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (e) {
    res.statusMessage = "User not found!";
    return res.status(400).end();
  }
});

router.put(
  "/update_user_favorite_products",
  ensureSession,
  async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOne({ _id: req.body._id });
      const updateFavProduct = user.favoriteProducts.includes(
        req.body.favoriteProduct
      )
        ? {
            $pull: {
              favoriteProducts: req.body.favoriteProduct,
            },
          }
        : {
            $push: {
              favoriteProducts: req.body.favoriteProduct,
            },
          };
      const updatedUser = await User.findByIdAndUpdate(
        req.body._id,
        updateFavProduct,
        {new: true}
      );
      console.log(updatedUser)
      console.log(user)
      req.session.passport.user = updatedUser;
      return res.status(200).send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        favoriteProducts: updatedUser.favoriteProducts,
      });
    } catch (e) {
      res.statusMessage = "User not found!";
      return res.status(400).end();
    }
  }
);

router.post("/list_users", ensureAdmin, async (req, res) => {
  try {
    const userList = await User.find();

    if (userList.length === 0) throw new Error("User List is empty");
    const filteredUserList = userList.map((item) => ({
      _id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      isAdmin: item.isAdmin,
    }));

    return res.status(200).send(filteredUserList);
  } catch (e) {
    res.statusMessage = "User not found!";
    return res.status(400).end();
  }
});

router.put("/update_user", ensureAdmin, async (req, res) => {
  try {
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        ...req.body,
      }
    );
    if (updatedUser === null) throw new Error("User not found!");
    return res.status(200).send({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (e) {
    res.statusMessage = "User not found!";
    return res.status(400).end();
  }
});

router.delete("/delete_user/:id", ensureAdmin, async (req, res) => {
  try {
    console.log(req.params);
    const deletedUser = await User.findOneAndRemove({
      _id: req.params.id,
    });

    return res.status(200).send("User is deleted");
  } catch (e) {
    console.log(e);
    return res.status(400).send("User not deleted");
  }
});
module.exports = router;
