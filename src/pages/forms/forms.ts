import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Business } from '../../models/business.model';
import { RestProvider } from './../../providers/rest/rest';

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
  selectedId: any;
  selectedName: any;
  showSelectedForm: boolean = false;
  sikafoneForm: boolean = false;
  farmersForm: boolean = false;
  merchanicsForm: boolean = false;
  shopsForm: boolean = false;
  schoolsForm: boolean= false;
  serviceForm: boolean =false;
  churchesForm: boolean = false;
  
  formValues = {} as Business;
  userId: string = 'py';
  constructor(public navCtrl: NavController, public navParams: NavParams, private restProvider: RestProvider) {
    this.selectedId = this.navParams.get('id');
    this.selectedName = this.navParams.get('name');
    this.formValues.userId = this.userId;
    this.formValues.directory = this.selectedName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
    console.log('selected navparams >>>' + 'id: ' + this.selectedId + '' + 'name: ' + this.selectedName);

    if (this.selectedName == 'Sikafone Agents') {
      this.sikafoneForm = true;
      console.log('selected Sikaphone form', this.sikafoneForm);
    } else if (this.selectedName == "Farmers") {
      this.farmersForm = true;
      console.log('selected farmers form', this.farmersForm);
    } else if (this.selectedName == 'Merchanics ') {
      this.merchanicsForm = true;
      console.log('selected merchanics form', this.merchanicsForm);
    }else if (this.selectedName == "Schools") {
      this.schoolsForm = true;
      console.log('selected schools form', this.schoolsForm);
    }else if (this.selectedName == "Shops") {
      this.shopsForm = true;
      console.log('selected shops form', this.shopsForm);
    }else if (this.selectedName == "Service") {
      this.serviceForm = true;
      console.log('selected services form', this.serviceForm);
    }else if (this.selectedName == "Churches") {
      this.churchesForm = true;
      console.log('selected churches form', this.churchesForm);
    }

  }

  onSubmt() {
    console.log('user login');
    if (this.formValues) {
      console.log('Business credentials', this.formValues);
      this.navCtrl.push('TabsPage');
    }
  }

  addBusiness() {
    console.log('formValues >>>', this.formValues);
    this.restProvider.createBusiness(this.formValues).then((result) => {
      console.log('Business added successfully',result);
      this.navCtrl.push('TabsPage');
    }, (err) => {
      console.log(err);
    });
  }
    
}

