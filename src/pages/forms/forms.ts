import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Business } from '../../models/business.model';
import { RestProvider } from './../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';

const DATABASE_FILE_NAME: string ="data.db";


/**
 * Generated class for the FormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html',
})

export class FormsPage {
  error: any;
  isLoading: any;
  isToast: any;
  latitude: any;
  longitude: any;
  base64Image: any;
  photos: any;
  currentLocation: any;

  imageURI:any;
  imageFileName:any;

  selectedId: any;
  selectedName: any;
  selectedGroup: any;

  showSelectedForm: boolean = false;
  sikafoneForm: boolean = false;
  farmersForm: boolean = false;
  public farmerForm: boolean = false;
  public electricianForm: boolean = false;
  public plumberForm: boolean = false;
  merchanicsForm: boolean = false;
  shopsForm: boolean = false;
  schoolsForm: boolean= false;
  servicesForm: boolean =false;
  churchesForm: boolean = false;
  dealersForm: boolean = false;
  momoForm: boolean = false;

  formValues = {} as Business;
  userId: string;
  public db:SQLiteObject;
  
  data = {} as Business;

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  
  balance = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private restProvider: RestProvider,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private camera: Camera,
              private transfer: FileTransfer,
              private toastCtrl: ToastController,
              public storage: Storage,
              private sqlite: SQLite,
              private toast: Toast) {

    this.selectedId = this.navParams.get('id');
    this.selectedName = this.navParams.get('name');
    this.selectedGroup = this.navParams.get('group');

    // this.formValues.userId = this.userId;
    this.formValues.directory = this.selectedName;
    this.formValues.group = this.selectedGroup;
    this.formValues.latitude = this.latitude;
    this.formValues.longitude = this.longitude;
    // this.formValues.fileUpload = this.base64Image;
    this.setGeoLocation();
    console.log('form values', this.formValues);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
    this.createDBFile();
    this.getData();
    console.log('selected navParams >>>' + 'id: ' + this.selectedId + '' + 'name: ' + this.selectedName + ' '+ 'group'+ this.selectedGroup);
    this.storage.get('username').then((userId) => {
      console.log('@forms username >>>', userId);
      this.userId = userId;
      this.formValues.userId = userId;
      this.formValues.findMeId = this.restProvider.generateFindMeId()
    });
    if (this.selectedName == 'Electrician') {
      this.electricianForm = true;
      console.log('selected Electrician form', this.electricianForm);
    } else if (this.selectedName == "Plumber") {
      this.plumberForm = true;
      console.log('selected Plumber form', this.plumberForm);
    } else if (this.selectedName == 'Carpenter') {
      this.merchanicsForm = true;
      console.log('selected Carpenter form', this.merchanicsForm);
    }else if (this.selectedName == "Painter") {
      this.merchanicsForm = true;
      console.log('selected Painter form', this.merchanicsForm);
    }else if (this.selectedName == "Merchanic") {
      this.merchanicsForm = true;
      console.log('selected Merchanic form', this.merchanicsForm);
    }else if (this.selectedName == "Welder") {
      this.merchanicsForm = true;
      console.log('selected Welder form', this.merchanicsForm);
    }else if (this.selectedName == "Farmer") {
      this.farmerForm = true;
      console.log('selected main farm form', this.farmerForm);
    }else if (this.selectedName == "Butcher") {
      this.farmersForm = true;
      console.log('selected services form', this.farmersForm);
    }else if (this.selectedName == "Food Vendor") {
      this.farmersForm = true;
      console.log('selected services form', this.farmersForm);
    }else if (this.selectedName == "Fisherman") {
      this.farmersForm = true;
      console.log('selected fisherman form', this.farmersForm);
    }else if (this.selectedName == "Police Station") {
      this.servicesForm = true;
      console.log('selected police form', this.servicesForm);
    }else if (this.selectedName == "Fire Service") {
      this.servicesForm = true;
      console.log('selected Fire service form', this.servicesForm);
    }else if (this.selectedName == "Hospital") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Clinic") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Herbal Center") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Computer Engineer") {
      this.servicesForm = true;
      console.log('selected Computer Engineer form', this.servicesForm);
    }else if (this.selectedName == "Banker") {
      this.servicesForm = true;
      console.log('selected Banker form', this.servicesForm);
    }else if (this.selectedName == "Administrator") {
      this.servicesForm = true;
      console.log('selected Administrator form', this.servicesForm);
    }else if (this.selectedName == "Counselor") {
      this.servicesForm = true;
      console.log('selected Counselor form', this.servicesForm);
    }else if (this.selectedName == "Journalist") {
      this.servicesForm = true;
      console.log('selected Journalist form', this.servicesForm);
    }else if (this.selectedName == "Sikafone Agent") {
      this.momoForm = true;
      console.log('selected Sikafone Agent form', this.momoForm);
    }else if (this.selectedName == "Other Mobile Money") {
      this.momoForm = true;
      console.log('selected Other Mobile Money form', this.momoForm);
    }else if (this.selectedName == "Lawyer") {
      this.servicesForm = true;
      console.log('selected Lawyer form', this.servicesForm);
    }else if (this.selectedName == "Doctor") {
      this.servicesForm = true;
      console.log('selected Doctor form', this.servicesForm);
    }else if (this.selectedName == "Nurse") {
      this.servicesForm = true;
      console.log('selected Nurse form', this.servicesForm);
    }else if (this.selectedName == "Teacher") {
      this.servicesForm = true;
      console.log('selected Teacher form', this.servicesForm);
    }else if (this.selectedName == "Tertiary") {
      this.schoolsForm = true;
      console.log('selected Teacher form', this.schoolsForm);
    }else if (this.selectedName == "High schools") {
      this.schoolsForm = true;
      console.log('selected High schools form', this.schoolsForm);
    }else if (this.selectedName == "Junior High schools") {
      this.schoolsForm = true;
      console.log('selectedJunior High schools form', this.schoolsForm);
    }else if (this.selectedName == "Training Institutions") {
      this.schoolsForm = true;
      console.log('selected Training form', this.schoolsForm);
    }else if (this.selectedName == "Vocational") {
      this.schoolsForm = true;
      console.log('selected Vocational form', this.schoolsForm);
    }else if (this.selectedName == "Technical") {
      this.schoolsForm = true;
      console.log('selected Technical form', this.schoolsForm);
    }
    
    this.setGeoLocation();
  }

  ionViewWillEnter() {
    this.getData();
  }

  createDBFile():void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('data.db created!!! ');
      // this.presentToast('data.db created!!! ');
      this.db = db;
      this.createDBTables();
      }).catch(e => console.log(JSON.stringify(e)));
  }


  createDBTables(): void{
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `business`( `id` INTEGER PRIMARY KEY,`userId` TEXT,`findMeId` TEXT,`officeName` TEXT,`otherNames` TEXT,`directory` TEXT,`group` TEXT,`mobile` TEXT,`email` TEXT,`gender` TEXT,`location` TEXT,`latitude` TEXT,`longitude` TEXT,`landSize` TEXT,`websiteUrl` TEXT,`fileUpload` TEXT,`timeDate` DATE,`dob` DATE,`otherInfo` TEXT,`gravatar` TEXT,`uploaded` BOOLEAN)', {}) 
    .then(()=>{
      console.log('Table business is created >>>>');
      // this.presentToast('Table business is created >>>>');

    }).catch(e => {  this.presentToast('error creating table  business >>'+e); console.log(JSON.stringify(e))});
  }

  setGeoLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.formValues.longitude = this.longitude
      this.formValues.latitude = this.latitude
      console.log('position resp >> ', resp.coords);
    }).catch((error) => {
      // this.error = error;
      console.log('error: true', this.error);
    });
  }
  
  takePicture(){
    console.log('take picture');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageURI = imageData;
      // this.formValues.fileUpload = this.base64Image;
      this.photos = this.base64Image;
      this.photos.reverse();
    }, (err) => {
     // Handle error
     let errMsg = 'error taking picture'
     console.log('error taking picture>>>' + err);
     this.presentErrorToast(errMsg);
    });
  }

  onSubmit() {
    this.showLoader();
    console.log('user login');
    if (this.formValues) {
      console.log('Business credentials', this.formValues);
      this.isLoading.dismiss();
      this.navCtrl.push('TabsPage');
    }
  }
  
  // addBusiness2() {
  //   this.showLoader();
  //   console.log('formvalues to save offline >>> ', this.formValues);
  //   this.db.executeSql('INSERT INTO `business` ( userId, findMeId, officeName, otherNames,directory,group,mobile,email,ender,location,latitude,longitude,farmSize,websiteUrl,fileUpload,timeDate,dob,otherInfo,gravatar) VALUES(\''+this.formValues.userId+ '\','+this.formValues.findMeId +', \''+this.formValues.directory+'\','+this.formValues.group+', \''+this.formValues.officeName+'\','+this.formValues.otherNames+',\''+this.formValues.latitude+'\','+this.formValues.longitude+',\''+this.formValues.mobile+'\','+this.formValues.gender+',\''+this.formValues.otherInfo+'\','+this.formValues.landSize+',\''+this.formValues.gravatar+'\',last_insert_rowid())', {})
  //     .then(()=>{
  //       console.log('business inserted in db..');
  //       this.presentToast('business inserted in db..') 
  //       this.isLoading.dismiss();

  //     }).catch(e => { 
  //        this.presentToast('error creating table  business >>'+JSON.stringify(e)); 
  //        console.log(JSON.stringify(e))
  //        this.isLoading.dismiss();

  //       });
  // }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS egal(rowid INTEGER PRIMARY KEY, userId TEXT, findMeId TEXT,officeName TEXT, otherNames TEXT, directory TEXT, group TEXT, mobile TEXT,email TEXT,gender TEXT,location TEXT,latitude TEXT,longitude TEXT,farmSize TEXT,websiteUrl TEXT,fileUpload TEXT,timeDate DATE,dob DATE,otherInfo TEXT,gravatar TEXT,uploaded BOOLEAN)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM egal ORDER BY rowid DESC', {})
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,userId:res.rows.item(i).userId,findMeId:res.rows.item(i).findMeId,officeName:res.rows.item(i).officeName,otherNames:res.rows.item(i).otherNames})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalExpense = parseInt(res.rows.item(0).totalExpense);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
    }).catch(e => console.log(e));
  }

  // addBusiness1() {
  //   this.sqlite.create({
  //     name: 'registerdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('INSERT INTO egal VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
  //       this.formValues.userId,
  //       this.formValues.findMeId,
  //        this.formValues.directory,
  //        this.formValues.group,
  //       this.formValues.officeName,
  //       this.formValues.otherNames,
  //       this.formValues.latitude,
  //        this.formValues.longitude,
  //        this.formValues.mobile,
  //        this.formValues.gender,
  //        this.formValues.email,
  //       this.formValues.landSize,
  //       this.formValues.otherInfo
  //     ])
  //       .then(res => {
  //         console.log(res);
  //         this.toast.show('Data saved', '5000', 'center').subscribe(
  //           toast => {
  //             this.navCtrl.popToRoot();
  //           }
  //         );
  //       })
  //       .catch(e => {
  //         console.log(e);
  //         this.toast.show(e, '5000', 'center').subscribe(
  //           toast => {
  //             console.log(toast);
  //           }
  //         );
  //       });
  //   }).catch(e => {
  //     console.log(e);
  //     this.toast.show(e, '5000', 'center').subscribe(
  //       toast => {
  //         console.log(toast);
  //       }
  //     );
  //   });
  // }

  addData() {
    this.navCtrl.push("AddDataPage");
  }
  
  // editData(rowid) {
  //   this.navCtrl.push("EditDataPage", {
  //     rowid:rowid
  //   });
  // }
  
  // deleteData(rowid) {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
  //     .then(res => {
  //       console.log(res);
  //       this.getData();
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }

  addBusiness() {
    this.showLoader();
    console.log('formValues >>>', this.formValues);
    if(this.formValues.userId !==null){
      this.restProvider.createBusiness(this.formValues).then((result) => {
        console.log('Business added successfully',result);
        this.isLoading.dismiss();
        this.presentToast('Business added successfully') 
        this.navCtrl.push('TabsPage');
      }, (err) => {
        console.log(err);
        // this.error = err;
        this.isLoading.dismiss();
        this.presentErrorToast(JSON.stringify(err));
      });
    }else{
      let msg = 'Oops, service timedout, Login';
      this.isLoading.dismiss();
      this.presentErrorToast(msg);
      this.navCtrl.push(LoginPage);
    }
  }

  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'submitting forms...'
    });
    this.isLoading.present();
  }

  // presentToast() {
  //     this.isToast = this.toastCtrl.create({
  //     message: 'Business successfully created',
  //     duration: 4000,
  //     position: 'middle'
  //   });
  
  //   this.isToast.present();
  // }
  

  presentToast(msg) {
    this.isToast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'middle'
  });

  this.isToast.present();
}
  presentErrorToast(msg) {
    this.isToast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'middle'
  });
  this.isToast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  this.isToast.present();
 }

}

