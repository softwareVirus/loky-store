const express = require('express')
const ContactForm = require('../models/contact')
const { ensureAdmin,ensureSession } = require('./middleware')

const router = express.Router()
router.post('/create_contact', ensureSession, async (req, res) => {
  try {
    console.log(req.body)
    const createdContact = await ContactForm.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      user: req.body.user._id
    })

    return res.status(200).send(createdContact)
  } catch (e) {
    res.statusMessage = 'Contact not created!'
    console.log(e)
    return res.status(400).end()
  }
})

router.get('/list_contacts', ensureAdmin, async (req, res) => {
  try {
    const contactList = await ContactForm.find({})

    return res.status(200).send(contactList.map(contact => ({
      _id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
    })))
  } catch (e) {
    res.statusMessage = 'Contacts not found!'
    return res.status(400).end()
  }
})

router.delete('/delete_contact/:_id', ensureAdmin, async (req, res) => {
  try {
    const deletedContact = await ContactForm.findOneAndRemove({
      _id: req.params._id,
    })

    return res.status(200).send('Contact is deleted')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Contact not deleted')
  }
})

module.exports = router
