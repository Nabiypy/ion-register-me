import { User } from './../../models/user.model';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  error: any;
  isLoading: any;
  credentials = {} as User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    console.log('signup credentials', this.credentials)
    this.showLoader();
    this.authService.createNewUser(this.credentials).then((result) => {
        this.isLoading.dismiss();
        console.log('signup response >>>',result);
        this.navCtrl.setRoot('TabsPage');
    }, (err) => {
        this.isLoading.dismiss();
        console.log('an error occured creating account >>>',err);
        // this.navCtrl.setRoot('TabsPage');
    });
}

login(){
  this.navCtrl.push('SignupPage');
 }
  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.isLoading.present();
} 

}
