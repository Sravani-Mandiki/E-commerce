const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
}, { timestamps: true });


const Order=mongoose.model("Order",orderSchema);

module.exports=Order;