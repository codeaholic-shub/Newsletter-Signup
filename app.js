//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;


const data = {
   members:[
     {
       email_address:email,
       status:"subscribed",
       merge_fields:{
         FNAME:firstName,
         LNAME:lastName
       }
     }
   ]
 };

const jsonData = JSON.stringify(data);
const url = 'https://us8.api.mailchimp.com/3.0/lists/29a6468d04';


const options={
    method:"POST",
    auth:"codeaholic-shub:b81df0993a5c2ad70acb2e015a3c989e-us8"
  };
  const request = https.request(url,options,function(response){
     response.on("data",function(data){
       sub_data = JSON.parse(data)
       if(response.statusCode !== 200){
         res.sendFile(__dirname+"/failure.html")
       }else{
         res.sendFile(__dirname+"/success.html")
       }
     });
   });


   request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is started on port 3000");
});

//listId
//29a6468d04

//apiKey
//b81df0993a5c2ad70acb2e015a3c989e-us8
