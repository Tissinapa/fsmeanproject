const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const User = require('../models/user')
const multer = require('multer')


router.post('/register', (req, res, next)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err) {
            throw err;
          };  
          if(user){
            
            return res.send("Email already in use");
          }else{
            User.addUser(newUser, (err,user)=>{
                if(err){
                    res.json({success: false, msg: "Failed to register"})
                } else {
                    res.json({success: true, msg: "User registered"})
                }
            })
          }
    })


})

router.post('/authenticate',(req,res,next)=>{
    const username = req.body.username
    const password = req.body.password

    User.getUserByUsername(username, (err, user)  =>{
        if(err) throw err
        if(!user){
            return res.json({success: false, msg: "User not found"})
        }
        User.comparePassword(password, user.password, (err,isMatch)=>{
            if(err) throw err
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                    success: true, 
                    token: "JWT "+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,

                    }
                })
                  
            }else{
                return res.json({success: false, msg: "Wrong password"})
            }
        })
    })
})
router.get('/profile', (req, res, next)=>{
    res.send("profile")
})

/* router.post('/notes', (req, res, next)=>{
    let newNote = new User({
        title: req.body.title,
        memo: req.body.memo,
        user: User._id
    })
    User.addNote(newNote, (err,user)=>{
        if(err){
            res.json({success: false, msg: "Failed to add note"})
        } else {
            res.json({success: true, msg: "New note added"})
        }
    })
}) */





module.exports = router