require("dotenv").config();

const express=require('express');
const app=express();

const dotenv = require("dotenv");
app.use(express.json());
const cors = require("cors");

const mongoose=require('mongoose');
const User=require("./models/users");
const Product=require("./models/products");
const Order=require("./models/orders");
const Order_item=require("./models/order_items");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes"); 

const { errorHandler } = require("./middleware/errorMiddleware");


dotenv.config();
app.use(cors());


main().then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce');
}

app.use("/products", productRoutes);
app.use("/users", userRoutes); 
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

// let user1=new User({
//     username:"Sravani",
//     password:"12345",
//     email:"abc@gmail.com",
//     address:"Hyd"
// });
// user1.save().then((res)=>{
//     console.log(user1);
// });

app.get("/",(req,res)=>{
    res.send("I am root");
});

app.listen(8080,()=>{
    console.log("Server is listening");
});



//Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGMyMmRjYzIwMzRlNWJmODgyZDM5NSIsImlhdCI6MTc0Mjc1MTgxNiwiZXhwIjoxNzQzMzU2NjE2fQ.hEpjNxKoQJ1luFxNUntwdj1k5NG5x4sadOJOPxyucC8
//user:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGMyMmRjYzIwMzRlNWJmODgyZDM5NSIsImlhdCI6MTc0Mjc1MTgxNiwiZXhwIjoxNzQzMzU2NjE2fQ.hEpjNxKoQJ1luFxNUntwdj1k5NG5x4sadOJOPxyucC8