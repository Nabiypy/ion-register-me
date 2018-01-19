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
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private restProvider: RestProvider,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private camera: Camera,
              private transfer: FileTransfer,
              private toastCtrl: ToastController,
              public storage: Storage) {

    this.selectedId = this.navParams.get('id');
    this.selectedName = this.navParams.get('name');
    this.selectedGroup = this.navParams.get('group');

    // this.formValues.userId = this.userId;
    this.formValues.directory = this.selectedName;
    this.formValues.group = this.selectedGroup;
    this.formValues.latitude = this.latitude;
    this.formValues.longitude = this.longitude;
    this.formValues.fileUpload = this.base64Image;
    this.setGeoLocation();
    console.log('form values', this.formValues);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
    console.log('selected navParams >>>' + 'id: ' + this.selectedId + '' + 'name: ' + this.selectedName + ' '+ 'group'+ this.selectedGroup);
    this.storage.get('username').then((userId) => {
      console.log('@forms username >>>', userId);
      this.userId = userId;
      this.formValues.userId = userId;
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
    }else if (this.selectedName == "Mobile Money") {
      this.momoForm = true;
      console.log('selected dealers form', this.momoForm);
    }

    this.setGeoLocation();
  }

  setGeoLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
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
      this.formValues.fileUpload = this.base64Image;
      this.photos = this.base64Image;
      this.photos.reverse();
    }, (err) => {
     // Handle error
     console.log('error taking picture>>>' + err);
     this.presentErrorToast(err);
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

  addBusiness() {
    this.showLoader();
    console.log('formValues >>>', this.formValues);
    if(this.formValues.userId !==null){
      this.restProvider.createBusiness(this.formValues).then((result) => {
        console.log('Business added successfully',result);
        this.isLoading.dismiss();
        this.presentToast() 
        this.navCtrl.push('TabsPage');
      }, (err) => {
        console.log(err);
        // this.error = err;
        this.isLoading.dismiss();
        this.presentErrorToast(err);
      });
    }else{
      let msg = 'Oops, timedout, try again';
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

  presentToast() {
      this.isToast = this.toastCtrl.create({
      message: 'Business successfully created',
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

