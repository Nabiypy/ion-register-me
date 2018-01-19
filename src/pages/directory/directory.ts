import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  isLoading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
    this.showLoader();

    this.restProvider.getLocalDirectories().then(data =>{
      this.isLoading.dismiss();
      this.directories = data['items'];
      console.log('all directories', this.directories);
    },(err) => {
      console.log("error occured ~ ", err);
    })

    // this.restProvider.getDirectories().then((data) => {
    //   this.isLoading.dismiss();
    //   this.directories = data;
    //   console.log('all directories', this.directories);
    // }, (err) => {
    //   console.log("an error occured from getDirectories");
    // });
    

  }

  selectedPost(post){
    console.log('selected directory', post);
    if(post.name == 'Electrician'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group });
    }else if( post.name == 'Plumber'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Carpenter'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Painter'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Merchanics '){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Shops'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Services'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Dealers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Mobile Money'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Farmer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Butcher'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Food Vendor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fisherman'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Police Station'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fire Service'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Hospital'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Clinic'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Herbal Center'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }


  }

  toggleSection(i) {
    this.directories[i].open = !this.directories[i].open;
  }
 
  toggleItem(i, j) {
    this.directories[i].children[j].open = !this.directories[i].children[j].open;
  }

  search():void{ console.log('goto search page')}

  showLoader() {
    this.isLoading = this.loadingCtrl.create({
      content: 'Loading directories...'
    });
    this.isLoading.present();

  }

}
