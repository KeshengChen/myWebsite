'use strict'
let express = require('express');
let uuid = require('uuid');
let path = require('path');
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
// app.use( (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
let functions = funImport.functions;
let funs =new functions();
function checklogin(req,res,next){ 
    if(req.session.sign || req.path=="/Login" || req.path=="/CheckLogin"){
        next();
    }else{
        res.redirect("/")
    }
}
app.use(checklogin);
app.get("/SignUp",funs.SignUp);
app.get("/CheckAliasExists",funs.CheckAliasExists);
app.get("/Login",funs.Login);
app.get("/UploadHeadImage",funs.UploadHeadImage);
app.get("/ChangeUserInfo",funs.ChangeUserInfo);
app.get("/Logout",funs.Logout);

app.get("/CheckLogin",funs.CheckLogin);
app.get("/UploadPhoto",funs.UploadPhoto);
app.get("/GetPhotoList",funs.GetPhotoList);

app.listen(8080);