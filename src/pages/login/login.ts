import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user.model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  error: any;
  isLoading: any;
  credentials = {} as User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public store: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    console.log('user login');
    if(this.credentials){
      console.log('user credentials',this.credentials);
      this.navCtrl.setRoot('TabsPage');
    }
  }

  signUp(){
    this.navCtrl.push('SignupPage');
 }
  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'authenticating...'
    });

    this.isLoading.present();
}



}
