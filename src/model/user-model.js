const mongoose = require('../../database');
const Constant = require('../utils/constant');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:''
    },
    role:{
        type:String,
        enum:['ADMIN','CUSTOMER','CHEF'],
        default:'CUSTOMER'
    },
    otp:{
        type:Number,
        default:1234
    }
})

module.exports = mongoose.model(Constant.COLLECTION_NAME.USER, UserSchema);