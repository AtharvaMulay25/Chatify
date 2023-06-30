const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    message: {
        text:{
            type: String,
        required: true
        }
    },    
    users:{
        type: Array
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageSchema);