const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');


const router = express.Router();

router.get("/", (req, res) => {
    console.log("Register trigerred !!");
    console.log(req.session.user);
    res.render('register');
});

router.post("/", (req, res) => {
    console.log("Register POST trigerred !!");
    console.log(req.body);

    const email = req.body.email;
    const name = req.body.name;
    const contactNumber = req.body.contactNumber;
    const State = req.body.State;
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;
    
    const user = User.findOne(
        { email: email },
        (err, obj) => {
            console.log(obj);
            if(obj == null) {
                console.log('CREATING !!!!!');
                let newUser = new User();
                newUser.name = name;
                newUser.email = email;
                newUser.contactNumber = contactNumber;
                newUser.State = State;
                newUser.password = pass1;
                newUser.save();

                const sessionUser = {
                    userId: newUser.id,
                    username: newUser.name
                };
                req.session.user = sessionUser;
                console.log(req.session.user);
                res.redirect('/session/login');
            }
            else{
                console.log('USER ALREADY EXISTS !!');
                return res.json({
                    message: 'User already exists !!!',
                    user: obj,
                    session: req.session.user
                })
            }
        }
    )
});

module.exports = router;