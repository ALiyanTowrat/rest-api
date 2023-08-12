const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    code:String,
    title:String,
    description:String,
    mrp:Number,
    sp:Number,
    discountpercent:Number,
    imagepath:String,
})

module.exports = mongoose.model('Product',productSchema)