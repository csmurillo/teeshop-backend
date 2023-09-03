const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const Item = mongoose.model('Item', ItemSceham);

const orderSchema = mongoose.Schema({
    clientAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    transactionId:{
        type:String,
        required:true,
    },
    items:{
        type: [ItemSchema]
    },
    amount:{
        type:Number,
        required:true
    }
});

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order}
