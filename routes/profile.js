const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');


const router = express.Router();

router.get("/", async(req, res) => {
    if(req.session.user) {
        console.log(req.session.user);
        const user = await User.findById(req.session.user.userId);
        const payload = {
            user: user
        }
        res.render('profile', payload);
    } else {
        res.redirect('/session/login');
    }
});

router.post("/update", (req, res) => {
    console.log(req.body);
    if(req.session.user) {
        const userId = req.session.user.userId;
        User.findByIdAndUpdate(
            userId,
            req.body,
            (err, obj) => {
                if(err) {
                    console.log(err);
                    res.redirect('/session/login');
                } else {
                    console.log("Updated User : ", obj);
                    res.redirect('/profile');
                }
            }
        );
    } else {
        res.redirect('/session/login');
    }
});

module.exports = router;