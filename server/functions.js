'use strict'
   Object.defineProperty(exports, "__esModule", {
        value: true
    });


let sqlImport = require('./sql.js');
let mysql = require('mysql');
let SQL= sqlImport.SQL;
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

exports.functions = functions;


// }
// app.get("/CheckUserNameExits",(req,res,next)=>{});
// app.get("/Login",(req,res,next)=>{});
// app.get("/UploadHeadImage",(req,res,next)=>{});
// app.get("/ChangeUserInfo",(req,res,next)=>{});
// app.get("/Logout",(req,res,next)=>{});

// app.get("/CheckLogin",(req,res,next)=>{});
// app.get("/UploadPhoto",(req,res,next)=>{});
// app.get("/GetPhotoList",(req,res,next)=>{});