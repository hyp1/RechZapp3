import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UploadComponent } from '../../components/upload/upload';
import { LoginPage } from '../../pages/login/login';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})

export class CreatePage {
  todo = {
    title:'',
    description:'',
}
  kanton:String;
  kantone:Array<any>;
  file:String;
  files:Array<any>;

  auth:AuthProvider;
  upload:UploadComponent;

  help:boolean;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, 
              public navParams: NavParams,auth:AuthProvider,upload:UploadComponent,private http:HttpClient) {
  this.auth=auth;
  this.upload=upload;
  this.kanton="Keine Angabe";
  this.files=[];
  /*
  this.awri.get('help').then(col=>{
    this.help=col;
  }).catch(err=>{
    console.log(err);
  }); 
*/
this.getKantons().then(data=>{
    this.kantone=<any>data;
    
  }).catch(err=>{
    console.log(err);
   // this.awri.showError(err);
  });
/*
  this.awri.get('kanton').then(data=>{
    this.kanton=data;
  },err=>{
    console.log(err);
  });
*/
  }


  sendFrage() {
    let tid=66;
    this.kantone.map(k => {
      if(k.name == this.kanton)tid=k.tid;
    });  
    
    for(var i=0;i<this.upload.MAX_UPLOADS;i++){
        let input:any=document.getElementById('images'+i);
        console.log(input);
    }
  let fils=this.upload.getFiles();
  console.log(fils);
    const data = {
      "body": this.todo.description,
      "anonym":"1",
      "field_kanton":tid,
   //   "fbid": this.awri.user.fbid,  
      "field_image":{"und":fils }
  }   
  
  this.createFrage(data).then(dat=>{
   
      console.log(dat);
      let alert = this.alertCtrl.create({
        title: 'Rechtsfrage gesendet',
        subTitle: 'Ihre Rechtsfrage wurde erfolgreich an AWRI gesendet.',
        buttons: ['Weiter']
      });
      alert.present();
      this.removeAll();
  }).catch(err=>{
alert("Fehler bei erstellen der Frage")
    // this.awri.showError(err);
  });

  }
  

  createFrage(data){
    return new Promise((resolve,reject) => {
      const headers = new HttpHeaders()
      .set('X-CSRF-TOKEN',<any>this.auth.token).set('Content-Type','application/json');    
    const options = {
      headers: headers,
      withCredentials: true
    };
       
 //console.log(JSON.stringify(data));
    this.http.post(this.auth.HOST+'/connect/awri_fragen',JSON.stringify(data),options).subscribe(data=> {
    resolve(data);       
     },err=>{
       reject(err);
     })
    })
    }

  changeListener($event) : void {
    this.file = $event.target.files[0];
   // console.log(this.file);
  }

  removePreview(nr) : void {
   // var filefield:any = document.getElementById('filefield'+nr);
    var previewfield:any = document.getElementById(this.upload.fieldname+''+nr);
   if(previewfield) previewfield.src="";
    //console.log(filefield);
   // filefield.style="display: block !important";
   }
   

  removeAll() : void {
    this.files=[];
  this.upload.resetFiles();
  this.todo.description="";
  }

  getKantons(){
    return new Promise((resolve,reject) => {
      const headers = new HttpHeaders().set('X-CSRF-TOKEN',<any>this.auth.token);    
      const options = {
        headers: headers,
        withCredentials: true
      };
        this.http.get(this.auth.HOST+'/'+this.auth.ENDPOINT+'/taxonomy_term?page=0&fields=vid,name&&parameters[vid]=3&pagesize=27&options[orderby][weight]=asc',options).subscribe(data=> {
          resolve(data);     
        },err=>{
          reject(err);
        })
    })
  }

  selectKanton(evt){
    this.kanton=evt
          /*
    this.awri.set('kanton',this.kanton).then(data=>{
      console.log(data);
    }
      ,err=>{
        console.error(err);
      });
    */
  }

  testFiles(){
  let f=this.upload.getFiles();
console.log(f);
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}
