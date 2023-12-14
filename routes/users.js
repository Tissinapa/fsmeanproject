const express = require('express')
const router = express.Router()



router.get('/register', (req, res, next)=>{
    res.send("Register")
})

router.get('/authenticate', (req, res, next)=>{
    res.send("authenticate")
})

router.get('/profile', (req, res, next)=>{
    res.send("profile")
})

router.get('/pictures', (req, res, next)=>{
    res.send("pictures")
})





module.exports = router