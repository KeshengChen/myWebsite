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
/*    async SignUp(req,res,next){
    }
    async CheckAliasExists(req,res,next){        
    }
*/   
async ReturnUserInfo(Id){
    if("number" ==typeof Id){
        let r = await this.Database.UserInfo.Select({Id});
        r.data[0].photolist=[];
        r.data[0].messagelist=[];
        delete r.data[0].PassWord;
        return r.data[0];
    }else{
        return {};
    }
}
 async Login(req,res,next){
        let Alias = req.body.Alias;
		let r = {};
        let PassWord = req.body.PassWord;
        try{
			r = await this.Database.UserInfo.Select({Alias,PassWord});
            r.userinfo = await this.ReturnUserInfo(r.data[0].Id);
		}catch(e){
			r = e;
		}
        if(r.result=="OK"){
            req.session.sign=true;
            req.session.UserInfo=r.data[0];
            res.json({login:true,msg:"登录成功。",userinfo:r.userinfo});
        }else{
            res.json({login:false,msg:"账户或密码不匹配。",userinfo:{}});
        }
    }
/*
    Logout(req,res,next){
        req.session.sign=false;
        req.session.UserInfo=undefined;
        res.json({logout:"OK"});
    }
    */
    async DeliveryHeadImage(req,res,next){
			console.log("x")	
	    let HI = this.path.join(__dirname,"HeadImage",req.session.UserInfo.Id+"");
			console.log("2x")	
        this.fs.readFile(HI, function(err, data) {
			console.log(err)	
            if (err) {
              res.end();
            }
            res.send(data);
            res.end();
        })    
	}
    async UploadHeadImage(req,res,next){
		let r = {};
		let HIname=req.session.UserInfo.Id.toString();
		this.fs.renameSync(req.files[0].path,this.path.join(__dirname,"HeadImage",HIname))
        req.session.UserInfo.HeadImage=HIname;
        try{
			r = await this.Database.UserInfo.Update(req.session.UserInfo);
		}catch(e){
			r = e;
		}
        if(r.result=="OK"){
			try{	
				r.userinfo=await this.ReturnUserInfo(r.data[0].Id);
				res.json({success:true,msg:"上传成功。",userinfo:r.userinfo});
            }catch(e){
				res.json({success:false,msg:"上传不成功。"});
			}
        }else{
            res.json({success:false,msg:"上传不成功。"});
        }
    }
    /*
    CheckLogin(req,res,next){
        if(req.session.sign){
            res.json({login:true,username:req.session.UserInfo.UserName});
        }else{
            res.json({login:false});
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
*/
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
