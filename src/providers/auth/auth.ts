import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var openFB;

@Injectable()
export class AuthProvider {
  //public  HOST='https://stage.awri.ch';

  public  HOST='http://kimo2007.dnshome.de:8888/stage.awri.ch';
  
  public  ENDPOINT='drupalgap';

  public loggedIn:boolean=false;
  public help:boolean=true;
 //token:Observable<string>;
  token: string;

  public user: {
    uid: number;
    name: string;
    email: string;
    picture: string;
    fbid: number;
    roles: Array<any>;
    created: number;
  };


  gettoken = new Observable<string>((observer: Observer<string>) => {
    this.http.get(this.HOST+'/?q=services/session/token', { responseType: 'text', withCredentials:true }).subscribe(token=>{
     // console.log(token);
    this.token=token;
     return observer.next(token);     
    })
  });


  connect = new Observable<any>((observer: Observer<any>) => {
    this.http.get(this.HOST+'/?q=services/session/token', { responseType: 'text', withCredentials:true }).subscribe(token=>{
   this.token=token;
      const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-CSRF-TOKEN', token)     
    const options = {
        headers: headers,     
        withCredentials:true
      };  
    this.http.post(this.HOST+'/'+this.ENDPOINT+'/system/connect.json',null,options).subscribe(data => {    
      let dat:any=data;
      this.user.uid=dat.user.uid;
      this.user.roles=dat.user.roles;
     // this.set('session_name',dat.session_name);
     // this.set('sessid',dat.sessid);      
     // this.session=dat.session_name+'='+dat.sessid;

   if(this.user.uid>0)  this.loadUser(this.user.uid).then(u=>{
      let vars:any=u;  
      this.user.name=vars.name;
      this.user.uid=vars.uid;
      this.user.roles=vars.roles;        
      if(this.user.uid>0){
        this.user.email=vars.mail;  
        this.user.created=vars.created;  
        this.loggedIn=true;              

        if(vars.field_fbid['und'])this.user.fbid=vars.field_fbid['und'][0].value;
        if(this.user.fbid)this.user.picture="https://graph.facebook.com/"+this.user.fbid+"/picture"     
        if(vars.picture) this.user.picture=vars.picture.url;
      }        
    },err=>{
      console.log(err);
    })

      return observer.next(this.user);  
    },err=>{
      console.log(err);
      return observer.next(this.user);  
    })     
   
    },err=>{
      console.log(err);
    })
  });


  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');  
    openFB.init({appId:'126766317359254',scope:'email'});
    this.user={
      uid:0,
      name:'Unbekannt',
      email:'',
      picture:'assets/imgs/anonymous.png',
      roles:[{0:'anonymous user'}],
      fbid:-1,
      created:Date.now(),
    };

    this.connect.subscribe(dat=>{
        console.log(dat);
  });

  //console.log(t);
  }


  loadUser(uid){
    return new Promise((resolve,reject) => {
    let headers = new HttpHeaders()
    .set('X-CSRF-TOKEN',<string>this.token).set('Content-Type', 'application/json');
    //.set('Authentication', <string>this.session);
  
  let options:any = {
    headers: headers,
    withCredentials	: true,
  };
  
    this.http.get(this.HOST+'/'+this.ENDPOINT+'/user/'+uid+'.json', options).subscribe(data => {
  
      resolve(data);
     },err=>{
       reject(err);
     })
    })
    }
  
    login(username:string,password:string){  
      return new Promise((resolve,reject) => {
     
      let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-CSRF-TOKEN', <string>this.token); 
      
      let options = {
          headers: headers,
          withCredentials: true 
      }; 
  
      const user ={
        username:username,
        password:password
      }
  
      this.http.post(this.HOST+'/'+this.ENDPOINT+'/user/login',user,options).subscribe(data => {         
  
            let vars=<any>data;
           this.token=vars.token;
          //  this.session=vars.session_name+'='+vars.sessid;
        //    this.user=vars.user;
          //  this.set('session_name',vars.session_name);
    //        this.set('sessid',vars.token);
  
            this.user.uid=vars.user.uid;
            this.user.roles=vars.user.roles;
            if(this.user.uid>0){
            
              this.loadUser(this.user.uid).then(u=>{
                let vars:any=u;  
          this.user.name=vars.name;
          this.user.uid=vars.uid;
          this.user.roles=vars.roles;        
          if(this.user.uid>0){
           // this.username=vars.user.name;
            if(vars.field_fbid['und'])this.user.fbid=vars.field_fbid['und'][0].value;
            if(this.user.fbid)this.user.picture="https://graph.facebook.com/"+this.user.fbid+"/picture"     
            if(vars.picture) this.user.picture=vars.picture.url;
          }        
              })
            }
           //   console.log(this.session);
            console.log(this.user);
            resolve(this.user);
          }, err => {
       //     if(err.status==401)this.showError("Falscher Benutzername oder falsches Passwort!");
       //     else this.showError("Anmeldung fehlgeschlagen:"+err.status);
            reject(err);
          });      
    });
  
    }
  
    logout() {    
      return new Promise((resolve,reject) => {
        const headers = new HttpHeaders()
    .set('X-CSRF-TOKEN',<any>this.token).set('Content-Type', 'application/json')
    
    const options = {
    headers: headers,
    withCredentials	: true,
    };
    
    this.http.post(this.HOST+'/'+this.ENDPOINT+'/user/logout.json',null,options).subscribe(data => {
          console.log(data);
         // let res:any=data;
         this.user={
          uid:0,
          name:'Unbekannt',
          email:'',
          picture:'assets/imgs/anonymous.png',
          roles:[{0:'anonymous user'}],
          fbid:-1,
          created:Date.now(),  
        }; 
        this.loggedIn=false;    
          console.log(data);
          resolve(data);
        }, err => {
          console.log(err);
          reject(err);
        });
      });
    }
  
    register(username:String,password:String,email:String){
      console.log('USER REGISTER'+username);
      return new Promise((resolve,reject) => {
         
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('X-CSRF-TOKEN', <string>this.token); 
        
        let options = {
            headers: headers,
            withCredentials: true 
        }; 
        let user ={
          mail:email,
          name:username,
          pass:password
        }
      
            this.http.post(this.HOST+'/'+this.ENDPOINT+'/user/register',user,options).subscribe(data => {         
              console.log(data);
              let vars=<any>data;
              this.user.uid=vars.uid;
              console.log(vars.uri);
              console.log(this.user.uid);      
              resolve(this.user)
            }, err => {
              reject(err);
            });                        
      });    
      }

    fblogin(){
      return new Promise((resolve,reject) => {
        console.log("awri.fblogin()");      
        openFB.login(
          function(response) {
            if (response.status === 'connected') {
           resolve(response);          
            }
            else if (response.error) { 
            reject(response.error);
             }
          },
          { scope: "email" });        
    });
   }
  
    fboauth(token:String){
      return new Promise((resolve,reject) => {
      let headers = new HttpHeaders()
      //.set('Content-Type', 'application/json')
      .set('X-CSRF-TOKEN', <string>this.token);  
      let options = {
          headers: headers,
          withCredentials: true 
      }; 
      let params ={
        access_token:token,
      }
    
        //console.log(headers);
          this.http.post(this.HOST+'/'+this.ENDPOINT+'/fboauth/connect.json',params,options).subscribe(data => {         
            console.log(data);
            let vars=<any>data;
            this.token=vars.token;
           // this.session=vars.session_name+'='+vars.sessid;
          //  this.user=vars.user;
            this.user.uid=vars.user.uid;
            this.user.roles=vars.user.roles;
            this.user.name=vars.user.name;
            if(vars.user.picture)this.user.picture=vars.user.picture.url;
            this.loggedIn=true;    
      //      if(vars.user.field_fbid['und'])this.user.fbid=vars.user.field_fbid['und'][0].value;
           // if(this.user.fbid)this.user.picture="https://graph.facebook.com/"+this.user.fbid+"/picture"
          //  console.log(this.user.fbid,"FBID");
         //   console.log(data.session_name+''+data.sessid);
            console.log(this);
            resolve(data);
          }, err => {
      //      console.log(err);
            reject(err);
          });      
     //     console.log(this.token);
    });  
    }


  isInRole(role){
    let ret=false;
    let obj=this.user.roles;
      Object.keys(obj).forEach(function(key) {
        if(obj[key]===role)ret=true;
    });
  return ret;
  }


}
