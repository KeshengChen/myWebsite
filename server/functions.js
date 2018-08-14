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
        if(r.result=="NO"){
            r = await this.Database.UserInfo.Insert(ui);
            if(r.result=="OK"){
                res.json(signup:"OK",msg:"注册成功。")；
            }else{
                res.json(signup:"NO",msg:"注册失败。")；
            }
        }else{
            res.json(signup:"NO",msg:"注册失败。")；
        }
    }
    async CheckAliasExists(req,res,next){        
        let ui=this.Database.UserInfo.NewRowData();
        ui.Alias = req.body.Alias;
        let r = await this.Database.UserInfo.Select(ui);
        if(r.result=="OK"){
            res.json({exist:true,msg:"账号已存在。"})
        }else{
            res.json({exist:false,msg:"账号不存在。"})
        }
    }
    async Login(req,res,next){
        let Alias = req.body.Alias;
        let PassWord = req.body.UserName;
        let r = await this.Database.UserInfo.Select(ui);
        if(r.result=="OK"){
            req.session.sign=true;
            req.session.UserInfo=r.data;
            res.json(login:true,msg:"登录成功。")；
        }else{
            res.json(login:false,msg:"账户或密码不匹配。")；
        }
    }
    Logout(req,res,next){
        req.session.sign=false;
        req.session.UserInfo=undefined;
        res.json({logout:"OK");
    }
    UploadHeadImage(req,res,next){
        console.log(req.files[0].path);
    }
    CheckLogin(req,res,next){
        if(req.session.sign){
            res.json({islogin:true});
        }else{
            res.json({islogin:false});
        }
    }
    async UploadPhoto(req,res,next){
        console.log(req.files.length);
        res.json({number:req.files.length})
    }
    async GetPhotoList(req,res,next){
        console.log(req.files.length);
        res.json({number:req.files.length})
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
