const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    size:{
        type:String,
        enum:['sm','md','lg','xl'],
        default:'sm'
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
});


module.exports = mongoose.model('Product',productSchema);


