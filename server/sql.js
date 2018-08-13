'use strict'
const SQL=function() {
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
exports.default=SQL;