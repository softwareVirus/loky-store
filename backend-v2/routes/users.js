const express = require('express')
const User = require('../models/user')
const { ensureSession, ensureAdmin } = require('./middleware')

const router = express.Router()

router.put('/update_user_favorite_products', ensureSession, async (req, res) => {
  try {
    const filteredUserList = await User.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        favoriteProducts: req.body.favoriteProducts,
      }
    )

    return res.status(200).send(filteredUserList)
  } catch (e) {
    res.statusMessage = 'User not found!'
    return res.status(400).end()
  }
})

router.post('/list_users', ensureAdmin, async (req, res) => {
  try {
    const userList = await User.find()

    if (userList.length === 0) throw new Error('User List is empty')
    const filteredUserList = userList.map(item => ({
      id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      isAdmin: item.isAdmin,
    }))

    return res.status(200).send(filteredUserList)
  } catch (e) {
    res.statusMessage = 'User not found!'
    return res.status(400).end()
  }
})

router.put('/update_user', ensureAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        ...req.body,
      }
    )
    if (updatedUser === null) throw new Error('User not found!')
    return res.status(200).send(updatedUser)
  } catch (e) {
    res.statusMessage = 'User not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_user', ensureAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.body._id,
    })

    return res.status(200).send('User is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('User not deleted')
  }
})
module.exports = router
