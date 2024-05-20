//Create a Server
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/db");


const PORT = process.env.PORT || 5000;
const products_routes = require("./routes/product");

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/products",products_routes);


const start = async() =>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(error){
        console.log(error);
    }
};

start();