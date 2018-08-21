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
        let userinfo = this.Database.UserInfo.NewRowData();
        userinfo.UserName=req.body.UserName;
        userinfo.Alias=req.body.Alias;
        userinfo.PassWord=req.body.pwd;
        let r = {};
        try{
			r = await this.Database.UserInfo.Insert(userinfo);
            r.userinfo = await this.ReturnUserInfo(r.data[0].Id);
		}catch(e){
			r = e;
		}
        if(r.result=="OK"){
            req.session.sign=true;
            req.session.UserInfo=r.data[0];
            res.json({success:true,msg:"创建并登录成功。",userinfo:r.userinfo});
        }else{
            res.json({success:false,msg:"未知原因。",userinfo:{}});
        }
    }
    async CheckAliasExists(req,res,next){  
        let Alias = req.body.Alias;
        let r = {};
        try{
            r = await this.Database.UserInfo.Select({Alias});
        }catch(e){
            r = e;
        }
        if(r.result=="OK"){
            res.json({exist:true,msg:"账号已经存在。",userinfo:r.userinfo});
        }else{
            res.json({exist:false,msg:"",userinfo:{}});
        }      
    }
   
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
        let HI = req.session.UserInfo.HeadImage;
        let p =  new Promise((resolve,reject)=>{            
            this.fs.readFile(HI, function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })  
        }) 
        let data = await p;
	}
    async UploadHeadImage(req,res,next){
		let r = {};
        let HIname=this.path.join(__dirname,"HeadImage",this.uuid.v1());
        var image = this.gm(req.files[0].path);
     
        try{
            minlen = await new Promise((resolve,reject)=>{
                this.child_process.exec("identify "+req.files[0].path,function(err,stdout,stderr){
                    if(err) reject(err);
                    if(stderr) reject(stderr);
                    let arr = stdout.split(' ');
                    console.log(stdout)
                    arr.forEach((item)=>{
                        if(item.contains('x')&&!item.contains('+')){                            
                            let tmparr=item.split('x');
                            let r=parseInt(tmparr[0])<parseInt(tmparr[1])?parseInt(tmparr[0]):parseInt(tmparr[1]);
                            resolve(r)
                        }
                    })
                })
            })
        }catch(e){
            let minlen=500;
            console.log(e);
        }
        let cmdline="convert" +req.files[0].path+" -resize 80x80 "+HIname+";";
        cmdline+="convert" +req.files[0].path+" -resize 500x500 "+HIname+"HD;";
        cmdline+="rm " +req.files[0].path+";";
        req.session.UserInfo.HeadImage=HIname;
        req.session.UserInfo.HDHeadImage="HD" + HIname;
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
