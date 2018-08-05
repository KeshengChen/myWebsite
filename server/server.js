'use strict'
let express = require('express');
let uuid = require('uuid');
let path = require('path');
let fs = require('fs')
let process = require('child_process');
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
    saveUninitialized: true,
}));

//cors----
// app.use( (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

function checklogin(req,res,next){
        console.log()
        if(req.session.sign|| req.path=="/login"){
            next();
        }else{
            res.send({nologin:"nologin"})
        }
}
app.use(checklogin);

app.post("/login",(req,res,next)=>{
    req.session.sign = true;
    res.send({sing:true});
});

app.listen(8080);