const User = require('../models/User');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('index session user:');
    console.log(req.session.user);
    res.render('index');
});

router.post('/', (req, res) => {
    console.log('index POST triggered !!');
    console.log(req.body);
})

module.exports = router;