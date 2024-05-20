//Connect backend with database

const mongoose = require("mongoose");
// uri = "mongodb+srv://abhilipsapuja6512:xMOQsVXyI9mwdnq7@cluster0.yab3mui.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = (uri) =>{
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;