const express=require('express');
const app=express();
const db=require('./support/dbConnect')
// Import required Routes
const mainRouter=require('./routes')
// mongoose
const mongoose=require('mongoose');
//Secure our password
const dotenv=require('dotenv');
const PORT=3000

// envirement config
dotenv.config();
//MIDDLEWARES
app.use(express.json());
// ROUTING
mainRouter(app);
// Connect to DB
db.connect().then(()=>{
    app.listen(PORT,()=>console.log("server up and running"));
})


