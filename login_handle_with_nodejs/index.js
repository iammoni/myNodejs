const express=require("express");
const app=express();
const port=process.env.PORT||3000;
const hostname='127.0.0.1';
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const passport = require("passport");

//middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//bring routes
const auth=require("./routes/api/auth.js");
const question=require("./routes/api/question.js");
const profile=require("./routes/api/profile.js");
// connect database

const db=require('./setup/myurl').url;
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log(err));;

// var MongoClient=require('mongodb').MongoClient;
// MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
// const collection=client.db('MyDatabase').collection('MyCollection');
// //rest of code go here
// console.log('Databse connected');
// // collection.insertOne({name:'Shubham',email:'shubhamdhanda@gamil.com'},function(err,res){
// // console.log('Data Inserted');
// //});
// client.close();
// });

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport); 
//Orginal routes
app.use("/api/auth",auth);
app.use("/api/question",question);
app.use("/api/profile",profile);
app.get('/',(req,res)=>{
res.send('Hello Bala JI');
});
app.listen(port,hostname,()=>console.log(`Server is running at port http://${hostname}:${port}`)); 


