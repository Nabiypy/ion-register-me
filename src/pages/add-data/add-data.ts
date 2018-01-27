import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading   } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { RestProvider } from './../../providers/rest/rest';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  public userId: any="hanson";
  public findMeId: any= "";
  lastImage: string = null;
  loading: Loading;
  imageUrl:string='null';
  // data = { userId:"", findMeId:"", type:"", officeName:"", mobile:"", latitude:"", longitude:"", gravatar:"", otherInfor:""};
  data = { date:"", type:"", description:"", amount:0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private restProvider: RestProvider,
    private camera: Camera, 
    private transfer: Transfer,
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform) {
      
      // this.data.latitude = '5.6500';
      // this.data.longitude ='-0.1833' 
    }
    ionViewDidLoad(){
      this.data.date= this.restProvider.generateFindMeId();
    }

    public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

    public takePicture(sourceType) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
     
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              
              let realPicName =this.createFileName();
              this.copyFileToLocalDir(correctPath, currentName, realPicName);
  
              // get picture name for offline DB storage
              this.imageUrl = correctPath+currentName;
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          let realPicName =this.createFileName();
        this.copyFileToLocalDir(correctPath, currentName, realPicName);
        this.imageUrl = correctPath+currentName;
        
        }
      }, (err) => {
        this.presentToast('Error while selecting image.');
      });
    }
    
     // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  // this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  //   this.lastImage = newFileName;
  // }, error => {
  //   this.presentToast('Error while storing file.');
  // });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    // return cordova.file.dataDirectory + img;
  }
}

    
  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)',[this.data.date,this.data.type,this.data.description,this.data.amount])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


}