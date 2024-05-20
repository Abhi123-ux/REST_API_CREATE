//Stored API data in Database using express and mongoose

require("dotenv").config();
const connectDB = require("./db/db");
const Product = require("./models/products");

const productJson = require("./products.json");

const start = async()=>{
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany(); //Delete Previous data and add new data
        await Product.create(productJson);
        console.log("Data Imported...");
        
    } catch (error) {
        console.log(error);
    }
}

start();