webpackJsonp([3],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_upload_upload__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CreatePage = /** @class */ (function () {
    function CreatePage(navCtrl, alertCtrl, navParams, auth, upload, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.todo = {
            title: '',
            description: '',
        };
        this.auth = auth;
        this.upload = upload;
        this.kanton = "Keine Angabe";
        this.files = [];
        /*
        this.awri.get('help').then(col=>{
          this.help=col;
        }).catch(err=>{
          console.log(err);
        });
      */
        this.getKantons().then(function (data) {
            _this.kantone = data;
        }).catch(function (err) {
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
    CreatePage.prototype.sendFrage = function () {
        var _this = this;
        var tid = 66;
        this.kantone.map(function (k) {
            if (k.name == _this.kanton)
                tid = k.tid;
        });
        for (var i = 0; i < this.upload.MAX_UPLOADS; i++) {
            var input = document.getElementById('images' + i);
            console.log(input);
        }
        var fils = this.upload.getFiles();
        console.log(fils);
        var data = {
            "body": this.todo.description,
            "anonym": "1",
            "field_kanton": tid,
            //   "fbid": this.awri.user.fbid,  
            "field_image": { "und": fils }
        };
        this.createFrage(data).then(function (dat) {
            console.log(dat);
            var alert = _this.alertCtrl.create({
                title: 'Rechtsfrage gesendet',
                subTitle: 'Ihre Rechtsfrage wurde erfolgreich an AWRI gesendet.',
                buttons: ['Weiter']
            });
            alert.present();
            _this.removeAll();
        }).catch(function (err) {
            alert("Fehler bei erstellen der Frage");
            // this.awri.showError(err);
        });
    };
    CreatePage.prototype.createFrage = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]()
                .set('X-CSRF-TOKEN', _this.auth.token).set('Content-Type', 'application/json');
            var options = {
                headers: headers,
                withCredentials: true
            };
            //console.log(JSON.stringify(data));
            _this.http.post(_this.auth.HOST + '/connect/awri_fragen', JSON.stringify(data), options).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    CreatePage.prototype.changeListener = function ($event) {
        this.file = $event.target.files[0];
        // console.log(this.file);
    };
    CreatePage.prototype.removePreview = function (nr) {
        // var filefield:any = document.getElementById('filefield'+nr);
        var previewfield = document.getElementById(this.upload.fieldname + '' + nr);
        if (previewfield)
            previewfield.src = "";
        //console.log(filefield);
        // filefield.style="display: block !important";
    };
    CreatePage.prototype.removeAll = function () {
        this.files = [];
        this.upload.resetFiles();
        this.todo.description = "";
    };
    CreatePage.prototype.getKantons = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]().set('X-CSRF-TOKEN', _this.auth.token);
            var options = {
                headers: headers,
                withCredentials: true
            };
            _this.http.get(_this.auth.HOST + '/' + _this.auth.ENDPOINT + '/taxonomy_term?page=0&fields=vid,name&&parameters[vid]=3&pagesize=27&options[orderby][weight]=asc', options).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    CreatePage.prototype.selectKanton = function (evt) {
        this.kanton = evt;
        /*
  this.awri.set('kanton',this.kanton).then(data=>{
    console.log(data);
  }
    ,err=>{
      console.error(err);
    });
  */
    };
    CreatePage.prototype.testFiles = function () {
        var f = this.upload.getFiles();
        console.log(f);
    };
    CreatePage.prototype.gotoLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    CreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/create/create.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-buttons end>\n            <button ion-button menuToggle>\n              <ion-icon name="menu"></ion-icon>\n            </button>\n            </ion-buttons>\n             \n            <ion-title>\n                Frage stellen \n              </ion-title>\n      <ion-buttons start>\n  <ng-template [ngIf]="this.auth.isInRole(\'authenticated user\')" [ngIfElse]="headerOut">\n              <button ion-button (click)="this.gotoLogin()">\n                  <img class="avatar" src="{{this.auth.user.picture}}"> {{auth.user.name}}        \n                </button>\n  </ng-template>      \n  <ng-template #headerOut>\n              <button ion-button (click)="this.gotoLogin()">\n              <ion-icon name="contact"></ion-icon>  {{auth.user.name}}\n              </button>\n  </ng-template>\n      </ion-buttons>    \n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div *ngIf="help" class="help">   \n        <ion-item>\n            <ion-label text-wrap>\n                <h2>Rechtsfrage stellen.</h2>\n                <p>Wenn sie Ihre Rechtsfrage nicht anonym stellen wollen, können sie ihre Frage einfach in unserer Facebookgruppe Rechtsforum Schweiz stellen. </p>\n              \n               <h2>Anonyme Rechtsfrage stellen.</h2>\n               <p>Sie können je nach Gerät über Browser oder Handy via Dateisystem,Webcam,Kamera bis zu 5 Dateien zu ihrer Frage hochladen. Klicken sie auf den upload Button um die ausgewählten Dateien einzeln hochzuladen oder "Alle Hochladen" um alle ausgewählten Dateien zur Frage anzuhängen.</p>\n                <p>Nachdem Sie Ihre Frage gestellt haben, wird sie auf AWRI als "nicht veröffentlicht" gespeichert.</p>\n                <p>Sobald ein Admin ihre Frage freigeschalten hat wird sie anonym auf AWRI sowie in der Facebookgruppe Rechtsforum Schweiz veröffentlicht und diskutiert. </p>\n                <p>Sobald ein Admin ihre Frage freigeschalten hat wird sie anonym auf AWRI sowie in der Facebookgruppe Rechtsforum Schweiz veröffentlicht und diskutiert. </p>\n\n              </ion-label>\n         </ion-item>\n</div>\n\n  <ng-template [ngIf]="this.auth.isInRole(\'authenticated user\')" [ngIfElse]="loggedOut">\n    <ion-title>Ihre Rechtsfrage wird anonym gestellt</ion-title>\n    \n      <ion-label text-wrap>Bitte beschreiben Sie den Sachverhalt möglichst genau und wählen Sie den betreffenden Kanton aus.</ion-label>\n      <ion-label text-wrap color="danger">Erwähnen Sie keine persönlichen Daten wie Namen Adressen,Telefonnummern, etc.</ion-label>\n      <ion-label text-wrap color="danger">Ihre Frage wird durch einen Admin geprüft und freigeschalten.</ion-label>\n    \n    <form #createForm="ngForm" (ngSubmit)="sendFrage()">\n\n        <ion-input type="hidden" value="{{this.auth.user.name}}" name="username" disabled></ion-input>\n        <ion-input type="hidden" value="{{this.auth.user.fbid}}" name="username" disabled></ion-input>\n        <ion-item>\n            <ion-label>Kanton</ion-label>\n\n            <ion-select [(ngModel)]="kanton" name="kanton" (ionChange)="selectKanton($event)">\n\n                <ion-option *ngFor="let item of kantone" value="{{item.name}}" id="{{item.tid}}">{{item.name}}</ion-option>\n\n            </ion-select>\n          </ion-item>       \n        <ion-item>\n          <ion-label>*Ihre Rechtsfrage</ion-label>\n          <ion-textarea required [(ngModel)]="todo.description" name="description"></ion-textarea>\n        </ion-item>\n        <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n        <button ion-button class="submit-btn" full type="submit"\n                [disabled]="!createForm.form.valid">Frage senden\n        </button>        \n      </form>\n    </ng-template>\n\n      <upload MAX_UPLOADS=3 fieldname="images"></upload>\n\n    <ng-template #loggedOut> \n        <ion-label color="danger" text-wrap><h2><ion-img  src="assets/imgs/anonymous.png"></ion-img> Sie sind nicht angemeldet!</h2></ion-label>\n        <ion-label text-wrap>Bitte melden sie sich an um anonyme Rechtsfragen zu stellen.</ion-label>\n        <button ion-button small (click)="gotoLogin()">Anmelden</button>\n        <form #createForm="ngForm" (ngSubmit)="sendFrage()">\n            <ion-item>\n              <ion-label>Name</ion-label>\n              <ion-input type="text" value="{{this.auth.username}}" name="username" disabled></ion-input>\n            </ion-item>\n                <ion-input type="hidden" value="{{this.auth.fbid}}" name="username" disabled></ion-input>\n              <ion-item>\n                  <ion-label>Kanton</ion-label>\n                  <ion-select [(ngModel)]="kanton" name="kanton" (ionChange)="selectKanton($event)" disabled>\n                      <ion-option *ngFor="let item of kantone" value="{{item.name}}" id="{{item.tid}}">{{item.name}}</ion-option>\n      \n                  </ion-select>\n                </ion-item>       \n              <ion-item>\n                <ion-label color="danger">*Ihre Rechtsfrage</ion-label>\n                <ion-textarea required [(ngModel)]="todo.description" name="description" disabled></ion-textarea>\n              </ion-item>\n              <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n              <button ion-button class="submit-btn" full type="submit"\n              disabled>Frage senden\n              </button>        \n            </form>\n    </ng-template>\n    </ion-content>\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/create/create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_3__components_upload_upload__["a" /* UploadComponent */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]])
    ], CreatePage);
    return CreatePage;
}());

//# sourceMappingURL=create.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.registerUser = function () {
        var _this = this;
        this.auth.register(this.username, this.password, this.email).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
            console.log(err.error.form_errors);
            if (err.status == 403)
                return _this.showError("Zugriff nicht erlaubt!");
            var key = Object.keys(err.error.form_errors)[0];
            _this.showError(err.error.form_errors[key]);
        });
        // console.log(this.email);
        // console.log(this.username);
        // console.log(this.password);
    };
    RegisterPage.prototype.fblogin = function () {
        var _this = this;
        this.auth.fblogin().then(function (data) {
            var dat = data;
            console.log(data);
            _this.auth.fboauth(dat.authResponse.accessToken).then(function (res) {
                console.log(res);
                _this.username = _this.auth.user.name;
            });
        });
    };
    ;
    RegisterPage.prototype.showError = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Fehler',
            message: msg,
            buttons: ['Weiter']
        });
        alert.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/register/register.html"*/'<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n          </ion-buttons>\n           \n          <ion-title>\n              Registrieren \n            </ion-title>\n    <ion-buttons end>\n<ng-template [ngIf]="this.auth.isInRole(\'authenticated user\')" [ngIfElse]="headerOut">\n            <button ion-button>\n                <img class="avatar" src="{{this.auth.user.picture}}"> {{auth.user.name}}        \n              </button>\n</ng-template>      \n<ng-template #headerOut>\n            <button ion-button>\n            <ion-icon name="contact"></ion-icon>  {{auth.user.name}}\n            </button>\n</ng-template>\n    </ion-buttons>    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n  <ion-card-content>Registrieren sie sich auf AWRI um Zugriff auf erweiterte Funktionen zu erhalten.\n     </ion-card-content>\n  </ion-card>\n  <form #registerForm="ngForm" (ngSubmit)="registerUser()" autocomplete="off">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n              <ion-item>\n                  <ion-input placeholder="Username" name="username" id="userField"\n                             type="text" required [(ngModel)]="username" #user></ion-input>\n                </ion-item>\n            <ion-item>\n              <ion-input placeholder="Email" name="email" id="emailField"\n                         type="email" required [(ngModel)]="email" #user></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input placeholder="Password" name="password" id="passwordField"\n                         type="password" required [(ngModel)]="password"></ion-input>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n          <button ion-button round full class="submit-btn" type="submit"\n                  [disabled]="!registerForm.form.valid">Profil erstellen\n          </button>        \n          </ion-col>\n      </ion-row>        \n    </form>\n    <button ion-button round full (click)="fblogin()"> <ion-icon name="logo-facebook"></ion-icon>Facebook</button>     \n\n</ion-content>\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create/create.module": [
		282,
		2
	],
	"../pages/login/login.module": [
		283,
		1
	],
	"../pages/register/register.module": [
		284,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UploadComponent = /** @class */ (function () {
    function UploadComponent(awri, camera, loadingCtrl, http, plt) {
        this.awri = awri;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.plt = plt;
        this.files = [];
        this.hideUpl = false;
        this.toggleVideo = false;
        this.toggleFiles = false;
        this.toggleCamera = false;
        this.togglePhoto = false;
        this.MAX_UPLOADS = 5;
        this.fieldname = "images";
        this.text = 'Sie können bis zu ' + this.MAX_UPLOADS + ' Bilddateien anhängen.';
        for (var i = 0; i < this.MAX_UPLOADS; i++)
            this.files.push({ fid: -1, name: '', src: '', uploaded: false });
    }
    UploadComponent.prototype.nativeSelectFile = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var id = _this.getImageID();
            _this.files[id].fid = -1;
            _this.files[id].src = base64Image;
            _this.files[id].name = _this.awri.user.uid + "-nativecam-" + Date.now() + ".jpg";
            var input = document.getElementById(_this.fieldname + '' + id);
            input.name = _this.files[id].name;
            input.src = _this.files[id].src;
            _this.hideUpload();
        }, function (err) {
            console.log(err);
            // this.awri.showError(err);
        });
    };
    UploadComponent.prototype.nativeCamera = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var id = _this.getImageID();
            _this.files[id].fid = -1;
            _this.files[id].src = base64Image;
            _this.files[id].name = _this.awri.user.uid + "-nativecam-" + Date.now() + ".jpg";
            var input = document.getElementById(_this.fieldname + '' + id);
            input.src = _this.files[id].src;
            input.name = _this.files[id].name;
            _this.hideUpload();
        }, function (err) {
            console.log(err);
            //  this.awri.showError(err);
        });
    };
    UploadComponent.prototype.toggleVid = function () {
        if (this.toggleVideo)
            this.toggleVideo = false;
        else
            this.toggleVideo = true;
        this.toggleFiles = false;
    };
    UploadComponent.prototype.toggleFil = function () {
        if (this.toggleFiles)
            this.toggleFiles = false;
        else
            this.toggleFiles = true;
        this.toggleVideo = false;
    };
    UploadComponent.prototype.toggleCam = function (evt) {
        if (this.toggleCamera) {
            //webmedia.js
            stopVideo();
            this.togglePhoto = false;
            this.toggleCamera = false;
            this.toggleVideo = false;
            evt.target.innerHTML = "Start Kamera";
        }
        else {
            //webmedia.js 
            startVideo('video1');
            this.togglePhoto = true;
            this.toggleCamera = true;
            evt.target.innerHTML = "Stop Kamera";
        }
    };
    UploadComponent.prototype.getFiles = function () {
        var f = [];
        // console.log(this.files);
        // alert(this.files.length)
        for (var i = 0; i < this.MAX_UPLOADS; i++) {
            var input = document.getElementById(this.fieldname + '' + i);
            console.log(input);
            // alert(this.files[i].fid);
            // if(this.files[i].fid!=-1)f.push({fid:this.files[i].fid});
            if (input)
                if (input.fid != -1 && input.name != '')
                    f.push({ fid: input.fid });
        }
        return f;
    };
    UploadComponent.prototype.removeImage = function (index) {
        var input = document.getElementById(this.fieldname + '' + index);
        input.src = '';
        this.files[index].fid = -1;
        this.files[index].name = '';
        this.files[index].src = '';
        this.files[index].uploaded = false;
        this.hideUpl = false;
    };
    UploadComponent.prototype.selectWebFile = function (elem) {
        var _this = this;
        var i = this.getImageID();
        //webmedia.js
        webpreviewFile(elem.srcElement, 'img#' + this.fieldname + i).then(function (data) {
            _this.files[i].fid = -1;
            _this.files[i].src = data.src;
            _this.files[i].name = _this.awri.user.uid + '-' + data.name;
            //  alert("ID"+i+' - '+data.name);      
            _this.hideUpload();
            console.log(_this.files);
        }).catch(function (err) {
            console.log(err);
            //   this.awri.showError(err);
        });
    };
    UploadComponent.prototype.selectWebVideo = function (elem) {
        var i = this.getImageID();
        //webmedia.js
        var data = snapShot(this.fieldname + '' + i);
        this.files[i].fid = -1;
        this.files[i].src = data.src;
        this.files[i].name = data.name;
        this.hideUpload();
    };
    UploadComponent.prototype.getImageID = function () {
        for (var i = 0; i < this.MAX_UPLOADS; i++)
            if (this.files[i].src === '')
                return i;
    };
    UploadComponent.prototype.hideUpload = function () {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].src === '')
                return this.hideUpl = false;
        }
        this.hideUpl = true;
    };
    UploadComponent.prototype.uploadFile = function (imgid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var input = document.getElementById(_this.fieldname + imgid);
            var dataURI = _this.files[imgid].src;
            dataURI = dataURI.substring(dataURI.indexOf(',') + 1, dataURI.length);
            var ext = input.name.split('.').pop();
            var filedata = {
                "filesize": dataURI.length,
                "filename": input.name,
                "filemime": "image/" + ext,
                "filepath": 'public://attachments/' + input.name,
                "status": 0,
                "file": dataURI
            };
            if (_this.files[imgid].fid == -1 && _this.files[imgid].name !== '') {
                var l_1 = _this.loadingCtrl.create({
                    content: "Datei hochladen. Bitte warten..."
                });
                l_1.present();
                _this.auploadFile(filedata).then(function (data) {
                    var dat = data;
                    input.fid = dat.fid;
                    _this.files[imgid].name = input.name;
                    _this.files[imgid].fid = dat.fid;
                    _this.files[imgid].uploaded = true;
                    l_1.dismiss();
                    resolve(_this.files[imgid]);
                }).catch(function (err) {
                    // console.log(err);       
                    l_1.dismiss();
                    reject(err);
                    //    this.awri.showError(err);
                });
            }
        });
    };
    UploadComponent.prototype.auploadFile = function (filedata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]()
                .set('X-CSRF-TOKEN', _this.awri.token).set('Content-Type', 'application/json');
            var options = {
                headers: headers,
                withCredentials: true,
            };
            _this.http.post(_this.awri.HOST + '/' + _this.awri.ENDPOINT + '/file.json', filedata, options).subscribe(function (data) {
                console.log(data);
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    UploadComponent.prototype.getImagePath = function (uri) {
        return uri.replace('public://attachments/', this.awri.HOST + '/sites/default/files/attachments/');
    };
    ;
    UploadComponent.prototype.uploadAllFiles = function () {
        for (var i = 0; i < this.MAX_UPLOADS; i++)
            if (this.files[i].fid == -1 && this.files[i].name != '') {
                this.uploadFile(i);
            }
    };
    UploadComponent.prototype.resetFiles = function () {
        for (var i = 0; i < this.MAX_UPLOADS; i++)
            this.removeImage(i);
    };
    UploadComponent.prototype.isBrowser = function () {
        if (this.plt.is('core') || this.plt.is('mobileweb'))
            return true;
        else
            return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], UploadComponent.prototype, "MAX_UPLOADS", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UploadComponent.prototype, "fieldname", void 0);
    UploadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'upload',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/components/upload/upload.html"*/'<ion-content padding>\n<ion-item>\n        <ion-label color="primary">{{text}}\n        </ion-label>                \n</ion-item>\n<ion-item text-wrap>\n        <ion-label color="primary">Schiessen sie ein Bild mit Ihrer Kamera oder wählen sie eine Datei in ihrem Browser und klicken Sie auf  <ion-icon name="cloud-upload"></ion-icon> Hochladen um die Datei anzuhängen. \n            </ion-label>  \n</ion-item>\n<ng-template #letupload>\n    <ion-item>\n        <ion-label color="danger" stacked><h2>Natürlich nur, wenn sie angemeldet angemeldet sind.\n        </h2></ion-label> \n      </ion-item>\n  </ng-template>\n\n<ion-item>\n        <ion-label color="danger" text-wrap>Bitte verdecken Sie persönliche Daten wie Namen, Adressen, Telefonnummern, etc.</ion-label>\n</ion-item>\n      \n<ng-template [ngIf]="awri.isInRole(\'authenticated user\')" [ngIfElse]="letupload">\n\n\n        <div *ngFor="let image of files;index as i">\n                <ion-card><p>{{1+i}}.</p>         \n            \n                    <img fid="-1" id="{{this.fieldname+i}}" src="" name=""> \n                    <ion-label>{{image.name}}</ion-label>\n                    <ion-row>\n                            <span *ngIf="files[i].name!=\'\'">\n                    <ion-buttons>\n                    <button ion-button left [disabled]="files[i].name==\'\'" title="Entfernen">\n                    <ion-icon name="trash" (click)="removeImage(i)"></ion-icon>\n                </button>\n         \n                <button ion-button right  [disabled]="files[i].uploaded" title="Hochladen">\n                <ion-icon name="cloud-upload" (click)="uploadFile(i)"></ion-icon>            \n            </button>\n  \n        </ion-buttons>    \n    </span>\n        </ion-row>\n            </ion-card>\n        </div>\n\n\n      </ng-template>\n\n      <ng-template [ngIf]="isBrowser()" [ngIfElse]="isApp">\n            <div showWhen="mobileweb"> \n                    <ion-label color="danger" text-wrap>Im Mobilen Browser können keine Dateien ausgewählt werden. </ion-label>\n                  </div>                      \n    <div hideWhen="mobileweb">\n            <button ion-button [(ngModel)]="toggleFiles" name="toggleFiles" ngDefaultControl (click)="toggleFil()" [disabled]="awri.isInRole(\'anonymous user\')">Dateien</button>\n        <div  *ngIf="toggleFiles">\n            <div *ngIf="!hideUpl">\n                <ion-input  id="filefield0"  type="file" accept="image/*" (change)="this.selectWebFile($event);"></ion-input>\n            </div>\n            </div>\n    </div>\n    \n     <button ion-button [(ngModel)]="toggleVideo" name="toggleVideo" ngDefaultControl (click)="toggleVid()" [disabled]="awri.isInRole(\'anonymous user\')">Kamera</button>\n                 <ion-card>\n                  <ion-item *ngIf="toggleVideo">\n                        <video id="video1" width="100%" height="100%" autoplay style="background-color:black;"></video>\n                        <button id="snap1" ion-button (click)="toggleCam($event)" block>Start Kamera</button>\n                        <canvas id="canvas1" width="640" height="480" style="display:none;"></canvas>\n                        <div *ngIf="!hideUpl">                        \n                        <button id="snap" [disabled]="!togglePhoto"  ion-button (click)="selectWebVideo(this)" block>Photo</button>\n                        </div>\n                  </ion-item>\n                </ion-card>\n            </ng-template>\n            <ng-template #isApp>\n                    <div *ngIf="!hideUpl">\n                     \n                        <button ion-button full (click)="nativeCamera()" [disabled]="awri.isInRole(\'anonymous user\')">Kamera</button>\n                        <button ion-button full (click)="nativeSelectFile()" [disabled]="awri.isInRole(\'anonymous user\')">Dateien</button>            \n                    </div>\n            </ng-template>\n\n            <button ion-button right (click)="uploadAllFiles()" [disabled]="awri.isInRole(\'anonymous user\')"><ion-icon name="cloud-upload" item-start></ion-icon> Alle Hochladen</button>\n            \n        </ion-content>\n\n\n  \n\n\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/components/upload/upload.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__["a" /* Platform */]])
    ], UploadComponent);
    return UploadComponent;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_admob_free__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var bannerConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: true
};
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, admobFree, auth) {
        //this.user=<any>auth.user;
        this.navCtrl = navCtrl;
        this.admobFree = admobFree;
        this.auth = auth;
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
            console.log("BannerConfig");
        })
            .catch(function (e) { return console.log(e); });
    }
    HomePage.prototype.gotoLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      </ion-buttons>\n    <ion-title>Home {{this.auth.user.name}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n<p>{{this.auth.HOST}}</p>\n  <div *ngIf="this.auth.user.uid>0">\n    ABMELDEN\n    <button ion-button (click)="this.auth.logout()">Abmelden</button>\n  </div>\n  <div *ngIf="this.auth.user.uid<1">\n      <button ion-button (click)="gotoLogin()">Login</button>\n      <button ion-button (click)="this.auth.fblogin()">Facebook</button>\n\n  </div>\n  <button ion-button (click)="gotoLogin()">Login</button>\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n  🙉 🙈 🙊\n\n  🤦 🙏 👍 👌 👎 ✌️💪 👏\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n\n  <upload></upload>\n</ion-content>\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_admob_free__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_register_register__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_create_create__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_upload_upload__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_upload_upload__["a" /* UploadComponent */],
                __WEBPACK_IMPORTED_MODULE_13__pages_create_create__["a" /* CreatePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create/create.module#CreatePageModule', name: 'CreatePage', segment: 'create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_upload_upload__["a" /* UploadComponent */],
                __WEBPACK_IMPORTED_MODULE_13__pages_create_create__["a" /* CreatePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_admob_free__["a" /* AdMobFree */],
                __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__components_upload_upload__["a" /* UploadComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_create_create__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Frage stellen', component: __WEBPACK_IMPORTED_MODULE_6__pages_create_create__["a" /* CreatePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/app/app.html"*/'<ion-split-pane when="sm">\n\n  <ion-menu [content]="content" side="right">\n    <ion-header>\n      <ion-toolbar color="secondary">\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n \n    <ion-content class="menu-container">\n      <ion-list no-lines>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="transparent list-item">\n          {{p.title}} \n\n        </button>\n      </ion-list>\n    </ion-content>\n \n  </ion-menu>\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content main swipeBackEnabled="false"></ion-nav>\n  </ion-split-pane>'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthProvider = /** @class */ (function () {
    function AuthProvider(http) {
        var _this = this;
        this.http = http;
        //public  HOST='https://stage.awri.ch';
        this.HOST = 'http://kimo2007.dnshome.de:8888/stage.awri.ch';
        this.ENDPOINT = 'drupalgap';
        this.loggedIn = false;
        this.help = true;
        this.gettoken = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.http.get(_this.HOST + '/?q=services/session/token', { responseType: 'text', withCredentials: true }).subscribe(function (token) {
                // console.log(token);
                _this.token = token;
                return observer.next(token);
            });
        });
        this.connect = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.http.get(_this.HOST + '/?q=services/session/token', { responseType: 'text', withCredentials: true }).subscribe(function (token) {
                _this.token = token;
                var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                    .set('Content-Type', 'application/json')
                    .set('X-CSRF-TOKEN', token);
                var options = {
                    headers: headers,
                    withCredentials: true
                };
                _this.http.post(_this.HOST + '/' + _this.ENDPOINT + '/system/connect.json', null, options).subscribe(function (data) {
                    var dat = data;
                    _this.user.uid = dat.user.uid;
                    _this.user.roles = dat.user.roles;
                    // this.set('session_name',dat.session_name);
                    // this.set('sessid',dat.sessid);      
                    // this.session=dat.session_name+'='+dat.sessid;
                    if (_this.user.uid > 0)
                        _this.loadUser(_this.user.uid).then(function (u) {
                            var vars = u;
                            _this.user.name = vars.name;
                            _this.user.uid = vars.uid;
                            _this.user.roles = vars.roles;
                            if (_this.user.uid > 0) {
                                _this.user.email = vars.mail;
                                _this.user.created = vars.created;
                                _this.loggedIn = true;
                                if (vars.field_fbid['und'])
                                    _this.user.fbid = vars.field_fbid['und'][0].value;
                                if (_this.user.fbid)
                                    _this.user.picture = "https://graph.facebook.com/" + _this.user.fbid + "/picture";
                                if (vars.picture)
                                    _this.user.picture = vars.picture.url;
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    return observer.next(_this.user);
                }, function (err) {
                    console.log(err);
                    return observer.next(_this.user);
                });
            }, function (err) {
                console.log(err);
            });
        });
        console.log('Hello AuthProvider Provider');
        openFB.init({ appId: '126766317359254', scope: 'email' });
        this.user = {
            uid: 0,
            name: 'Unbekannt',
            email: '',
            picture: 'assets/imgs/anonymous.png',
            roles: [{ 0: 'anonymous user' }],
            fbid: -1,
            created: Date.now(),
        };
        this.connect.subscribe(function (dat) {
            console.log(dat);
        });
        //console.log(t);
    }
    AuthProvider.prototype.loadUser = function (uid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('X-CSRF-TOKEN', _this.token).set('Content-Type', 'application/json');
            //.set('Authentication', <string>this.session);
            var options = {
                headers: headers,
                withCredentials: true,
            };
            _this.http.get(_this.HOST + '/' + _this.ENDPOINT + '/user/' + uid + '.json', options).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthProvider.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('Content-Type', 'application/json')
                .set('X-CSRF-TOKEN', _this.token);
            var options = {
                headers: headers,
                withCredentials: true
            };
            var user = {
                username: username,
                password: password
            };
            _this.http.post(_this.HOST + '/' + _this.ENDPOINT + '/user/login', user, options).subscribe(function (data) {
                var vars = data;
                _this.token = vars.token;
                //  this.session=vars.session_name+'='+vars.sessid;
                //    this.user=vars.user;
                //  this.set('session_name',vars.session_name);
                //        this.set('sessid',vars.token);
                _this.user.uid = vars.user.uid;
                _this.user.roles = vars.user.roles;
                if (_this.user.uid > 0) {
                    _this.loadUser(_this.user.uid).then(function (u) {
                        var vars = u;
                        _this.user.name = vars.name;
                        _this.user.uid = vars.uid;
                        _this.user.roles = vars.roles;
                        if (_this.user.uid > 0) {
                            // this.username=vars.user.name;
                            if (vars.field_fbid['und'])
                                _this.user.fbid = vars.field_fbid['und'][0].value;
                            if (_this.user.fbid)
                                _this.user.picture = "https://graph.facebook.com/" + _this.user.fbid + "/picture";
                            if (vars.picture)
                                _this.user.picture = vars.picture.url;
                        }
                    });
                }
                //   console.log(this.session);
                console.log(_this.user);
                resolve(_this.user);
            }, function (err) {
                //     if(err.status==401)this.showError("Falscher Benutzername oder falsches Passwort!");
                //     else this.showError("Anmeldung fehlgeschlagen:"+err.status);
                reject(err);
            });
        });
    };
    AuthProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('X-CSRF-TOKEN', _this.token).set('Content-Type', 'application/json');
            var options = {
                headers: headers,
                withCredentials: true,
            };
            _this.http.post(_this.HOST + '/' + _this.ENDPOINT + '/user/logout.json', null, options).subscribe(function (data) {
                console.log(data);
                // let res:any=data;
                _this.user = {
                    uid: 0,
                    name: 'Unbekannt',
                    email: '',
                    picture: 'assets/imgs/anonymous.png',
                    roles: [{ 0: 'anonymous user' }],
                    fbid: -1,
                    created: Date.now(),
                };
                _this.loggedIn = false;
                console.log(data);
                resolve(data);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    AuthProvider.prototype.register = function (username, password, email) {
        var _this = this;
        console.log('USER REGISTER' + username);
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('Content-Type', 'application/json')
                .set('X-CSRF-TOKEN', _this.token);
            var options = {
                headers: headers,
                withCredentials: true
            };
            var user = {
                mail: email,
                name: username,
                pass: password
            };
            _this.http.post(_this.HOST + '/' + _this.ENDPOINT + '/user/register', user, options).subscribe(function (data) {
                console.log(data);
                var vars = data;
                _this.user.uid = vars.uid;
                console.log(vars.uri);
                console.log(_this.user.uid);
                resolve(_this.user);
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthProvider.prototype.fblogin = function () {
        return new Promise(function (resolve, reject) {
            console.log("awri.fblogin()");
            openFB.login(function (response) {
                if (response.status === 'connected') {
                    resolve(response);
                }
                else if (response.error) {
                    reject(response.error);
                }
            }, { scope: "email" });
        });
    };
    AuthProvider.prototype.fboauth = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
                .set('X-CSRF-TOKEN', _this.token);
            var options = {
                headers: headers,
                withCredentials: true
            };
            var params = {
                access_token: token,
            };
            //console.log(headers);
            _this.http.post(_this.HOST + '/' + _this.ENDPOINT + '/fboauth/connect.json', params, options).subscribe(function (data) {
                console.log(data);
                var vars = data;
                _this.token = vars.token;
                // this.session=vars.session_name+'='+vars.sessid;
                //  this.user=vars.user;
                _this.user.uid = vars.user.uid;
                _this.user.roles = vars.user.roles;
                _this.user.name = vars.user.name;
                if (vars.user.picture)
                    _this.user.picture = vars.user.picture.url;
                _this.loggedIn = true;
                //      if(vars.user.field_fbid['und'])this.user.fbid=vars.user.field_fbid['und'][0].value;
                // if(this.user.fbid)this.user.picture="https://graph.facebook.com/"+this.user.fbid+"/picture"
                //  console.log(this.user.fbid,"FBID");
                //   console.log(data.session_name+''+data.sessid);
                console.log(_this);
                resolve(data);
            }, function (err) {
                //      console.log(err);
                reject(err);
            });
            //     console.log(this.token);
        });
    };
    AuthProvider.prototype.isInRole = function (role) {
        var ret = false;
        var obj = this.user.roles;
        Object.keys(obj).forEach(function (key) {
            if (obj[key] === role)
                ret = true;
        });
        return ret;
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_register_register__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        //alert('username: ' + this.username);
        this.auth.login(this.username, this.password).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            _this.username = "";
            _this.password = "";
            console.log(err);
        });
    };
    LoginPage.prototype.gotoRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.fblogin = function () {
        var _this = this;
        this.auth.fblogin().then(function (data) {
            var dat = data;
            _this.auth.fboauth(dat.authResponse.accessToken).then(function (res) {
                //        this.username=<String>this.awri.username;
                console.log(res);
            });
        });
    };
    ;
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n          </ion-buttons>\n           \n          <ion-title>\n              Anmelden \n            </ion-title>\n    <ion-buttons end>\n<ng-template [ngIf]="this.auth.isInRole(\'authenticated user\')" [ngIfElse]="headerOut">\n            <button ion-button>\n                <img class="avatar" src="{{this.auth.user.picture}}"> {{auth.user.name}}        \n              </button>\n</ng-template>      \n<ng-template #headerOut>\n            <button ion-button>\n            <ion-icon name="contact"></ion-icon>  {{auth.user.name}}\n            </button>\n</ng-template>\n    </ion-buttons>    \n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n<ng-template [ngIf]="this.auth.isInRole(\'authenticated user\')" [ngIfElse]="loggedOut">\n    <ion-item>\n        <ion-label color="secondary">{{auth.HOST}}</ion-label>        \n      </ion-item>\n      <ion-item>\n          <ion-avatar item-start>\n            <img src="{{this.auth.user.picture}}">\n          </ion-avatar>\n          {{ this.auth.user.name }} \n        </ion-item>\n  <ion-item>\n      \n        <ion-label>Sie sind als {{auth.user.name}} angemeldet</ion-label>        \n      </ion-item>\n        <button ion-button round lightgray full  (click)="this.auth.logout()">Abmelden</button>\n\n</ng-template>      \n<ng-template #loggedOut>\n  <form #loginForm="ngForm" (ngSubmit)="login()" autocomplete="off">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            <ion-item>\n              <ion-input placeholder="Benutzername" name="username" id="userField"\n                         type="text" required [(ngModel)]="username" #userField></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input placeholder="Password" name="password" id="passwordField"\n                         type="password" required [(ngModel)]="password"></ion-input>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <div *ngIf="error" class="alert alert-danger">{{error}}</div>\n          <button ion-button class="submit-btn" full round type="submit"\n                  [disabled]="!loginForm.form.valid">Anmelden\n          </button> \n        </ion-col>\n      </ion-row>    \n        </form>  \n          \n        <button ion-button round  full  (click)="fblogin()"> <ion-icon name="logo-facebook"></ion-icon>Facebook</button>               \n        <button ion-button round  full  (click)="gotoRegister()">Registrieren</button>         \n  \n    \n    <ion-label color="danger"><a ion-link  href="{{this.auth.HOST}}/user/password" target="_BLANK">Passwort vergessen?</a></ion-label>\n  </ng-template>\n</ion-content>\n'/*ion-inline-end:"/media/robert/Volume1/www/2018/RechZapp3/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map