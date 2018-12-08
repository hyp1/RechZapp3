import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";

import { Observable } from 'rxjs/Observable';

import { LoginPage } from "../../pages/login/login";


import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
const bannerConfig: AdMobFreeBannerConfig = {
  // add your config here
  // for the sake of this example we will just use the test config
  isTesting: true,
  autoShow: true
 };




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
user:Observable<any>;
  constructor(public navCtrl: NavController,private admobFree: AdMobFree,public auth:AuthProvider) {
//this.user=<any>auth.user;

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
        console.log("BannerConfig");
      })
      .catch(e => console.log(e));    

  }

gotoLogin(){
this.navCtrl.push(LoginPage);
}


}
