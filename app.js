const express  = require("express");
const app = express();
const studentroute = require('./api/router/student')
const facultyroute = require('./api/router/faculty ')
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const productroute = require('./api/router/product')
const Userroute = require("./api/router/user")
const fileUpload = require("express-fileupload")

mongoose.connect('mongodb+srv://aliyantowrat5227:03554421032aliyan@mydatabase.qbvltfj.mongodb.net/')

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database....');
});

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.use('/student',studentroute)
app.use('/faculty',facultyroute)
app.use('/product',productroute)
app.use("/user",Userroute)


app.use((req,res,next)=> {
    res.status(404).json({
       Error:'bed request'
    })

})

module.exports = app;