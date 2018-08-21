'use strict'
let express = require('express');
let uuid = require('uuid');
let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let funImport = require('./functions.js');
let bodyParser = require('body-parser');
let multer = require('multer');
let session = require('express-session');
let cookieParser = require('cookie-parser');

let app = express();
app.use(multer({ dest: path.join(__dirname, 'cache')}).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));

//cors----
 app.use( (req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });
let functions = funImport.functions;
functions.prototype.fs=fs;
functions.prototype.path=path;
functions.prototype.uuid=uuid;
functions.prototype.child_process =child_process;
let funs =new functions();
function checklogin(req,res,next){ 
    if(req.session.sign || req.path=="/Login" || req.path=="/CheckLogin"){
        next();
    }else{
        res.redirect("/")
    }
}
app.use(checklogin);
/*
app.post("/SignUp",funs.SignUp);
app.post("/CheckAliasExists",funs.CheckAliasExists);
*/
app.post("/Login",funs.Login.bind(funs));
app.post("/UploadHeadImage",funs.UploadHeadImage.bind(funs));
app.post("/HeadImage",funs.HeadImage.bind(funs));
app.post("/HeadImageHD",funs.HeadImageHD.bind(funs));
app.post("/Logout",funs.Logout.bind(funs));
/*app.post("/ChangeUserInfo",funs.ChangeUserInfo);

app.post("/CheckLogin",funs.CheckLogin);
app.post("/UploadPhoto",funs.UploadPhoto);
app.post("/GetPhotoList",funs.GetPhotoList);
*/
app.listen(8080);
