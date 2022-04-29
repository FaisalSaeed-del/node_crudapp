// imports
require("dotenv").config();
const express= require("express");
const mongoose= require("mongoose");
const session= require("express-session");

const app= express();

const PORT=process.env.PORT || 4000;

// database Connection //
mongoose.connect('mongodb://localhost:27017/node_crud',{useNewUrlParser:true},(err)=>{
if(!err) {console.log('MongoDB is connected')}
else {console.log('Error in MongoDB:'+err)}
});

//middleware // 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//session

app.use(
    session({
        secret:"my secret key",
        saveUninitialized:true,
        resave: false,
    })
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//Set the template engine
app.set("view engine", "ejs");

// route prefix

app.use("",require("./routes/routes"));

app.listen(PORT,()=>{
    console.log(`server started ar http://localhost:${PORT}`);
});