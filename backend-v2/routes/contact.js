const express = require('express')
const ContactForm = require('../models/contact')
const { ensureAdmin,ensureSession } = require('./middleware')

const router = express.Router()
router.post('/create_contact', ensureSession, async (req, res) => {
  try {
    const createdContact = await OrderCard.create({
      ...req.body,
    })

    return res.status(200).send(createdContact)
  } catch (e) {
    res.statusMessage = 'Contact not created!'
    return res.status(400).end()
  }
})

router.post('/list_contacts', ensureAdmin, async (req, res) => {
  try {
    const contactList = await OrderCard.find({})

    return res.status(200).send(contactList)
  } catch (e) {
    res.statusMessage = 'Contacts not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_contact', ensureAdmin, async (req, res) => {
  try {
    const deletedContact = await ContactForm.findOneAndDelete({
      _id: req.body._id,
    })

    return res.status(200).send('Contact is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Contact not deleted')
  }
})

module.exports = router
