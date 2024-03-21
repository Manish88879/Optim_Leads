const express = require("express");
const  mongoose = require('mongoose');
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');

dotenv.config({path: "./.env"});
const app = express();
const port =  5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connect('mongodb+srv://Manish49724:admin@123@optimleads.udq0ecb.mongodb.net/')
const connectToMongoDB = require("./functions/config/mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    age:Number
})

const UserModal = mongoose.model("users" , UserSchema)

app.get('/' , (req , res) => {
    res.send('App is running');
  });

app.use('/users' , require("./functions/user/user_router"));
app.use('/leads' , require("./functions/leads/leadsRouter"))
app.use('/brokers', require("./functions/brokers/brokersRouter"))

app.get("/getUsers" , (req , res ) => {
    UserModal.find({name: "Manish"}).then(function(users){
        res.json(users)
        console.log("Found Items -- " , users)
    }).catch(function(err){
        console.log("error " , err)
    })
});

app.use((req, res) => {
    res.status(404).send("API not found, please check your path");
  });


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
    connectToMongoDB();
  });

exports.handler = serverless(app);
