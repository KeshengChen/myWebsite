'use strict'
   Object.defineProperty(exports, "__esModule", {
        value: true
    });
let DBImport = require('./testWebsite.js');
let testWebsite= DBImport.testWebsite;

class functions{
    constructor(){
        this.Database= new testWebsite();
    }
    async SignUp(req,res,next){
        let ui=this.Database.UserInfo.NewRowData();
        ui.Alias = req.body.Alias;
        ui.UserName = req.body.UserName;
        ui.PassWord = req.body.PassWord;
        let r = await this.Database.UserInfo.Select(ui);
        console.log("r",r);
        if(r.result=="NO"){
            console.log("insert",await this.Database.UserInfo.Insert(ui));
        }
    }
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
