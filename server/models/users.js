const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 2
    }, 
    isAvatarImageSet:{
        type: Boolean,
        default: false
    },
    avatarImage:{
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('User', userSchema);