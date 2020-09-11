const User = require('../models/User');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async(req, res) => {
    if(req.session.user) {
        console.log(req.session.user);
        const user = await User.findById(req.session.user.userId);
        const payload = {
            user: user
        }
        res.render('index', payload);
    } else {
        res.render('index');
    }
});

router.post('/', (req, res) => {
    console.log('index POST triggered !!');
    console.log(req.body);
})

module.exports = router;