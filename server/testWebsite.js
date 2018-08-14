'use strict'
let mysql = require('mysql');
class testWebsite{
    constructor(){
        this.connection = mysql.createConnection({
            host:"localhost",
            port:3306,
            user:"root",
            password:"123147",
            database:"testWebsite"
        })
        this.UserInfo = new UserInfo(this.connection);
    }
}
class Table{
    constructor(){        
        this.fields = this.getfields();
    }
    Insert(obj){
        let tmparr = [];
        this.fields.forEach((item,index) =>{
            if("number" != typeof obj[item]){
                tmparr.push("'" + obj[item] + "'");
            }else{
                 tmparr.push(obj[item]);
            }
        })
        let sql = "INSERT INTO " + this.TableName + "(" + this.fields.join(",") + ") VALUES(" + tmparr.join(",") + ")";
        return this.Query(sql);
    }
    Delete(Id){
        let sql = "DELETE FROM " + this.TableName + " WHERE Id = " + Id;
        return this.Query(sql);
    }
    async Update(obj){
        let oldobj = await this.Select(obj);
        if(oldobj.result == "ERR") return oldobj;
		oldobj = oldobj.data;
		
        let tmparr = [];
        this.fields.forEach((item) =>{
            if(obj[item] !== oldobj[item]){
                if("number" != typeof obj[item]){
                    tmparr.push(item + " = '" + obj[item] + "'");
                }else{
                     tmparr.push(item + " = " + obj[item]);
                }
            }
        })
        let sql = "UPDATE " + this.TableName + " SET " + tmparr.join(",");
        return this.Query(sql);
    }
    Select(obj){
        let tmparr=[];
        let sql='';
        if('number'==(typeof obj.Id) && obj.Id>=0){
            sql = "SELECT * FROM " + this.TableName + " WHERE Id=" + obj.Id;
        }else{
            this.fields.forEach((item)=>{
                if("number" != typeof obj[item]){
        			if(obj[item] != '' && obj[item] != undefined) {
						tmparr.push(item + " = '" + obj[item]+"'");
					}
			    }else{
                     tmparr.push(item + " = " + obj[item]);
                }                
            })
            sql = "SELECT * FROM " + this.TableName + " WHERE " + tmparr.join(" AND ");
        }
        return this.Query(sql);
    }
    Query(sql){
        return new Promise((resolve,reject)=>{            
            this.conn.query(sql,(err,result) =>{
				if(err){
                    reject(err)
                }else if(result.affectedRows<= 0){
                    resolve({result:"NO",msg:"Nothing",data:result}) 
                }else{
                    resolve({result:"OK",msg:result.affectedRows + " row(s) affected",data:result});
                }
            })
        })
    }
    getfields(){
        let r = [];
        let tmp = this.NewRowData()
        for(let field in tmp){
            if(field!= "Id"){
                r.push(field);
            }
        }
        return r;
    };
}
    class UserInfo extends Table{
        constructor(conn){            
            super();
            this.TableName = "UserInfo";
            this.conn = conn; 
        }
        NewRowData() {
            return{
                Id:-1,
                Alias:'',
                UserName:'',
                PassWord:'',
                IsAdmin:0,
                HeadImage:''
            }
        };

    }



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.testWebsite = testWebsite;


// }
// app.get("/CheckUserNameExits",(req,res,next) =>{});
// app.get("/Login",(req,res,next) =>{});
// app.get("/UploadHeadImage",(req,res,next) =>{});
// app.get("/ChangeUserInfo",(req,res,next) =>{});
// app.get("/Logout",(req,res,next) =>{});

// app.get("/CheckLogin",(req,res,next) =>{});
// app.get("/UploadPhoto",(req,res,next) =>{});
// app.get("/GetPhotoList",(req,res,next) =>{});
