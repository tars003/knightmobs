const express = require('express');
const sessionChecker = require('../middleware/auth');
const session = require('express-session');
const User = require('../models/User');


const router = express.Router();


// LOGIN Template View
router.get("/login", (req, res) => {
    res.render('login');
});


// LOGIN POST View
router.post("/login", (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass.toString();
        User.findOne(
            { email: email },
            (err, obj) => {
                if (err) throw(err);
                if (obj == null){
                    return res.status(400).json({
                        'error': 'User not found !!!'
                    });
                }
                else{
                    user = obj;
                    if (user && user.comparePasswords(pass)){
                        const sessionUser = {
                            userId: user.id,
                            username: user.name
                        }
                        req.session.user = sessionUser;
                        console.log(req.session.user);
                        res.redirect('/profile');
                    }
                }
            }
        );

    } catch (err) {
        
    }
    
});


// LOGOUT GET View
router.get("/logout", (req, res) => {
    try {
        const user = req.session.user;
        if(user) {
            req.session.destroy((err) => {
                if (err) throw(err);

                res.clearCookie('sid');
                res.redirect('/session/login');
            });
        }
        else{
            return res.status(400).json({ 'error': 'User not identified, corrupt session !' });
        }
    } catch (err) {
        console.log(err);
        return res.json({ 'error': 'Something went  wrong while accessing this route !' });
    }    
    
});

module.exports = router;