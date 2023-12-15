const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        required: true 
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const PictureShema = new Schema({
    image:{
        type: Buffer,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const User = module.exports = mongoose.model('User', UserSchema)
const Picture = mongoose.model('Picture', PictureShema);


module.exports.getUserById = function(id, callback){
    User.findById(id,callback)
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query,callback)
}

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err
        callback(null, isMatch)
    })
}

module.exports.getPictureById = function(id, callback){
    Picture.findById(somePictureId).populate('user').exec((err, picture) => {
        if (err) {
            console.error(err);
        } else {
            console.log(picture);
        }
    });
}
module.exports.addPicture = function(newPicture,callback){
    const image = new Picture(newPicture)
    image.save((err, savedPicture)=>{
        if(err){
            console.log("Error saving picture")
        }
        callback(null,savedPicture)
    })
}