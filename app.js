const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/FirstSiteDB",{useNewUrlParser:true});

const InfoSchema={
    name : String,
    user : String,
    email : String,
    Phn : Number,
    MName : String,
    FName : String,
    DOB: Number,
    Aadhar : Number,
    Caste : String,
    state : String,
    town : String,
    city : String,
    village : String,
    zip : Number,
    pswd: String
};

const UserInfo = mongoose.model("Information",InfoSchema);

let numb = 0;

app.get("/", function(req, res){
    res.render("register");
});
app.get("/login", function(req,res){
    res.render("login")
})
app.get("/about",function(req,res){
    UserInfo.find({Phn : numb},function(err,info){
        res.render("about",{details : info})
    })
    numb = 0;
    })

app.post("/",function(req,res){
    const firstInfo = new UserInfo({
        name : req.body.UserName,
        user: req.body.Username,
        email : req.body.Email,
        Phn : req.body.PhnNo,
        MName : req.body.MotherName,
        FName : req.body.FatherName,
        DOB : req.body.DOB,
        Aadhar : req.body.AadharNo,
        Caste : req.body.Caste,
        state : req.body.State,
        town : req.body.Town,
        city : req.body.City,
        village : req.body.Village,
        zip : req.body.PIN,
        pswd : req.body.Password
    });
    firstInfo.save(function(err){
        if(!err){
            res.redirect("/login")
        };
    });
});

app.post("/login",function(req,res){
    const logUserName = req.body.loggedName;
    const logPhnNo = req.body.loggedPhnNo;
    const logPass = req.body.loggedPass;

    // numb.push(logPhnNo);

    UserInfo.findOne({Phn : logPhnNo},function(err,info){
        const registerUserName = info.user;
        // const registerPhn = info.Phn;
        const registerPass = info.pswd;

        if(registerUserName===logUserName && registerPass===logPass){
            numb = numb + logPhnNo;
            res.redirect("/about")
         }
    })
})








app.listen(3000,function(){
    console.log("Port is serving at 3000");
});