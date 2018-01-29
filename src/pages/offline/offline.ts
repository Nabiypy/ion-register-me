import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {
  businessess: any;
  isLoading: any;
  allBusiness: any;
  isToast: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
    this.showLoader();
     this.restProvider.getBusinessess().then((data) => {
      this.isLoading.dismiss();
      this.businessess = data;
      console.log('all businessess >>>', this.businessess);
    }, (err) => {
      console.log("an error occured from getBusinessess");
    });
  }

  editBusiness(bus) {
    console.log('edit business', bus);
    // this.navCtrl.push("EditDataPage", {
    //   rowid:rowid
    // });
  }
  
  deleteBusiness(bus) {
    console.log('delele business', bus);
  }

  showLoader() {
    this.isLoading = this.loadingCtrl.create({
      content: 'Loading businessess...'
    });
    this.isLoading.present();

  }

  presentToast(msg) {
    this.isToast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'middle'
  });

  this.isToast.present();
}

}
