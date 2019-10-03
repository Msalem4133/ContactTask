const express = require('express');
const Contact = require('../models/contact');
const auth = require('../middleware/auth');
const router = new express.Router();

//const router = new express.Router();

router.post('/contacts/addcontact', auth, async (req, res) => {
  const contact = new Contact({
    firstname:req.body['firstname'],
    lastname:req.body['lastname'],
    email:req.body['email'],
    mobile:req.body['mobile'],
    owner: req.user._id
  });
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/contacts/getList', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({owner:req.user._id});
    res.send(contacts);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/contacts/getRecentList', auth, async (req, res) => {

  try {
    const contacts = await Contact.find({owner: req.user._id }).limit(5);
    if (!contacts) res.status(401).send();
    res.send(contacts);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
