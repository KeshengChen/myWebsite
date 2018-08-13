'use strict'
let express = require('express');
let uuid = require('uuid');
let path = require('path');
let mysql = require('mysql');
let functions = require('./functions.js');
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
let x =new functions();
x.SignUP({body:{Alias:"sa2",PassWord:"pwd"}});
function checklogin(req,res,next){ 
    if(req.session.sign || req.path=="/login" || req.path=="/check"){
        next();
    }else{
        res.redirect("/")
    }
}
app.use(checklogin);
app.get("/SignUp",(req,res,next)=>{});
app.get("/CheckUserNameExits",(req,res,next)=>{});
app.get("/Login",(req,res,next)=>{});
app.get("/UploadHeadImage",(req,res,next)=>{});
app.get("/ChangeUserInfo",(req,res,next)=>{});
app.get("/Logout",(req,res,next)=>{});

app.get("/CheckLogin",(req,res,next)=>{});
app.get("/UploadPhoto",(req,res,next)=>{});
app.get("/GetPhotoList",(req,res,next)=>{});




app.get("/check",(req,res,next)=>{
	if(req.session.sign){
    	res.send(req.session.userinfo);
	}else{
   		res.send({islogin:false})
	}
})
app.post("/upload",(req,res,next)=>{
    console.log(req.files)
    res.send({status:"ok"})
})
app.post("/login",(req,res,next)=>{
    try{
        if(req.body.alias=='sa'){
            req.session.userinfo={
                    islogin:true,
                    username:'陈克胜',
                    photolist:[],
                    messagelist:["m1"],
                }
            req.session.sign = true;
            res.send(req.session.userinfo);
        }else{
            res.send({
                islogin:false,
                username:req.body.username,
                photolist:[],
                messagelist:[],
            });
        }
    }catch(e){
        res.send({errorMsg:e.message})
    }
});

app.listen(8080);

//functions
function functions (){
    let newui=()=>{return {
        Id:-1,
        Alias:'',
        UserName:'',
        PassWord:'',
        IsAdmin:0,
        HeadPhoto:''
    }};
    this.connection = mysql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"123147",
        database:"testWebsite"
    })
    this.sql=new SQL();
    this.SignUp=(req,res,next)=>{
        let ui=newui();
        ui.Alias = req.body.Alias;
        ui.UserName = req.body.UserName;
        ui.PassWord = req.body.PassWord;
        let sql = this.sql.SignUp(ui);
        this.connection.query(sql,(err, result)=>{
            console.log(result);
        })
        sql = this.sql.Login(ui.Alias,ui.PassWord);
        this.connection.query(sql,(err, result)=>{
            console.log(result);
        })

       
    };
}
//SQL
functionSQL() {
    this.CheckUserNameExist = (alias)=>{
        return "SELECT CASE WHEN COUNT(*) = 1 THEN TRUE ELSE FALSE END AS Exist FROM UserInfo WHERE Alias = '"+alias+"'";
    }
    this.SignUp = (ui)=>{
        return "INSERT INTO UserInfo(Alias,UserName,PassWord) VALUES('"+ui.Alias+"','"+ui.UserName+"','"+ui.PassWord+"')";
    }
    this.Login=(alias,password)=>{
        return "SELECT * FROM UserInfo WHERE Alias='"+alias+"' AND PassWord = '"+password+"'";
    }
    this.UploadHeadImage=(ui,headimage)=>{
        return "UPDATE UserInfo SET HeadPhoto='"+headimage+"' WHERE Id="+ui.Id;
    }
    this.ChangeUserInfo=(oldui,newui)=>{
        var sets=[];
        for(var prop in newui){
            if(oldui[prop]!=newui[prop] && prop!='Id'){
                if(Number ==typeof newui[prop]){
                    sets.push(prop+" = "+newui[prop]);
                }else{
                    sets.push(prop+" = '"+newui[prop]+"'");
                }
            }
        }
        if(sets.length>0){
            return "UPDATE UserInfo SET "+sets.join(',');
        }else{
            return undefined;
        }
    }

   // app.get("/CheckLogin",(req,res,next)=>{});
    //app.get("/UploadPhoto",(req,res,next)=>{});
    //app.get("/GetPhotoList",(req,res,next)=>{});
}