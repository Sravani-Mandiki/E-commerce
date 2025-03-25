const mongoose=require('mongoose');
const initData=require('./data.js');
const Product=require('../models/products.js');


main().then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/E-commerce');
}

const initDB=async ()=>{
    await Product.deleteMany({});
    await Product.insertMany(initData.products);
    console.log("data is initialized");
};

initDB();