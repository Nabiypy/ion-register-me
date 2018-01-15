import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {
  directories: any;
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
    this.restProvider.getDirectories().then((data) => {
      this.directories = data;
      console.log('all directories', this.directories);
    }, (err) => {
      console.log("an error occured from getDirectories");
    });

  }

  selectedPost(post){
    console.log('selected directory', post);
    if(post.name == 'Farmers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Sikafone Agents'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Sikafone Agents'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Schools'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Merchanics '){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Shops'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Service'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else if( post.name == 'Dealers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name});
    }else {
      this.navCtrl.push('FormsPage');
    }

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
