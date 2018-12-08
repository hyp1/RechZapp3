import { Component,Input } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {LoadingController,Loading } from 'ionic-angular';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Platform } from 'ionic-angular/platform/platform';
/**
  webmedia.js WebRTC Video adapter.js
 https://github.com/webrtc/adapter
 */
 declare var webpreviewFile;  //Browser Datei Image select
 declare var startVideo;      //start Video 
 declare var stopVideo;       //stop Viedo
 declare var snapShot;        //Video Camera Snapshot  

 @Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})


export class UploadComponent {
  @Input() MAX_UPLOADS: number;
  @Input() fieldname: string;
  //:number=5;
  text: string;
  public files: Array<{fid: number, name:string, src:string,uploaded:boolean}>=[];
  hideUpl:boolean=false;
  toggleVideo:boolean=false;
  toggleFiles:boolean=false;
  toggleCamera:boolean=false;
  togglePhoto:boolean=false;

  loading:Loading;


  constructor(public awri:AuthProvider,private camera: Camera, private loadingCtrl:LoadingController,private http:HttpClient,private plt:Platform) {
  this.MAX_UPLOADS=5;
  this.fieldname="images";

    this.text = 'Sie können bis zu '+this.MAX_UPLOADS+' Bilddateien anhängen.';
    for(var i=0;i<this.MAX_UPLOADS;i++)this.files.push({fid:-1,name:'',src:'',uploaded:false});
  }

  
  nativeSelectFile(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }    
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let id=this.getImageID();
      this.files[id].fid=-1;
      this.files[id].src=base64Image;
      this.files[id].name=this.awri.user.uid+"-nativecam-"+Date.now()+".jpg";
      let input:any = document.getElementById(this.fieldname+''+id); 
      input.name = this.files[id].name;    
      input.src=this.files[id].src;
      this.hideUpload();
    }, (err) => {
      console.log(err);
    // this.awri.showError(err);
    });
  }


  
  nativeCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let id=this.getImageID();
      this.files[id].fid=-1;
      this.files[id].src=base64Image;
      this.files[id].name=this.awri.user.uid+"-nativecam-"+Date.now()+".jpg";
      let input:any = document.getElementById(this.fieldname+''+id);
      input.src=this.files[id].src;
      input.name = this.files[id].name;    
      this.hideUpload();
    }, (err) => {
      console.log(err);
    //  this.awri.showError(err);
    });
  }

  toggleVid(){
    if(this.toggleVideo)this.toggleVideo=false;
    else this.toggleVideo=true;
    this.toggleFiles=false;
  }

  
  toggleFil(){
    if(this.toggleFiles)this.toggleFiles=false;
    else this.toggleFiles=true;
    this.toggleVideo=false;
 }


  toggleCam(evt){
    if(this.toggleCamera){
    //webmedia.js
    stopVideo();
    this.togglePhoto=false;
    this.toggleCamera=false;
    this.toggleVideo=false;
    evt.target.innerHTML="Start Kamera"
    } else{
      //webmedia.js 
      startVideo('video1');
      this.togglePhoto=true;
      this.toggleCamera=true;
      evt.target.innerHTML="Stop Kamera"
    }
  }

  getFiles(){
    let f=[];
   // console.log(this.files);
   // alert(this.files.length)
    for(var i=0;i<this.MAX_UPLOADS;i++){
      let input:any=document.getElementById(this.fieldname+''+i);
      console.log(input);
   // alert(this.files[i].fid);
   // if(this.files[i].fid!=-1)f.push({fid:this.files[i].fid});
    if(input)if(input.fid!=-1&&input.name!='')f.push({fid:input.fid});
    }
  return f;
  }

  removeImage(index){
    let input:any = document.getElementById(this.fieldname+''+index);
    input.src='';
    this.files[index].fid=-1;
    this.files[index].name='';
    this.files[index].src='';
    this.files[index].uploaded=false;
    this.hideUpl=false;
  }

  selectWebFile(elem){
    let i=this.getImageID();
      //webmedia.js
    webpreviewFile(elem.srcElement,'img#'+this.fieldname+i).then(data=>{
      this.files[i].fid=-1;
      this.files[i].src=data.src;
      this.files[i].name=this.awri.user.uid+'-'+data.name;
    //  alert("ID"+i+' - '+data.name);      
      this.hideUpload();
      console.log(this.files);
    }).catch(err=>{
      console.log(err);
   //   this.awri.showError(err);
    }) 
  }

  selectWebVideo(elem){
    var i=this.getImageID();
    //webmedia.js
    var data=snapShot(this.fieldname+''+i);
    this.files[i].fid=-1;
    this.files[i].src=data.src;
    this.files[i].name=data.name;
    this.hideUpload();
  }

  getImageID(){
    for(var i=0;i<this.MAX_UPLOADS;i++)
      if(this.files[i].src==='')return i;      
  }

  hideUpload() {
    for(var i=0;i<this.files.length;i++){
      if(this.files[i].src==='')return this.hideUpl=false;
    }  
  this.hideUpl=true;
  }
  
  uploadFile(imgid){ 
    return new Promise((resolve,reject)=>{
    let input:any = document.getElementById(this.fieldname+imgid);
    let dataURI=this.files[imgid].src;
    dataURI=dataURI.substring(dataURI.indexOf(',')+1,dataURI.length);     
    let ext=input.name.split('.').pop();
    let filedata={
      "filesize":dataURI.length,
      "filename": input.name,
      "filemime":"image/"+ext,
       "filepath":'public://attachments/'+input.name,
       "status": 0,
       "file": dataURI 
    };

    if(this.files[imgid].fid==-1&&this.files[imgid].name!==''){
      let l = this.loadingCtrl.create({
        content: "Datei hochladen. Bitte warten..."
      });
      l.present();
    
      this.auploadFile(filedata).then(data=>{
        let dat:any=data;
        input.fid=dat.fid;
        this.files[imgid].name=input.name;
        this.files[imgid].fid=dat.fid;
        this.files[imgid].uploaded=true;
        l.dismiss();
        resolve(this.files[imgid]);
     }).catch(err=>{
       // console.log(err);       
       l.dismiss();
        reject(err);
    //    this.awri.showError(err);
     });
    }    
  });
    
  }

  auploadFile(filedata){
    return new Promise((resolve,reject) => {
    const headers = new HttpHeaders()
    .set('X-CSRF-TOKEN',<any>this.awri.token).set('Content-Type', 'application/json')
    const options = {
    headers: headers,
    withCredentials	: true,
    };
    this.http.post(this.awri.HOST+'/'+this.awri.ENDPOINT+'/file.json',filedata,options).subscribe(data => {
      console.log(data);
  
      resolve(data);
    }, err => {
      reject(err);
    });
  });
  }


  getImagePath(uri):String{
    return uri.replace('public://attachments/',this.awri.HOST+'/sites/default/files/attachments/');
};
 


  uploadAllFiles(){
    for(var i=0;i<this.MAX_UPLOADS;i++)    
      if(this.files[i].fid==-1&&this.files[i].name!=''){
        this.uploadFile(i);     
  }
}

resetFiles(){
  for(var i=0;i<this.MAX_UPLOADS;i++)    
      this.removeImage(i);     
}

isBrowser(){
  if(this.plt.is('core') || this.plt.is('mobileweb'))return true;
  else return false; 
}

}
