import { Geolocation } from '@ionic-native/geolocation';
import { Directory } from './../../models/directory.model';
import { Business } from './../../models/business.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploads',
  templateUrl: 'uploads.html',
})
export class UploadsPage {
  database:SQLiteObject;
  public mybusiness: Array<Business>;
  public myUpBusiness: Array<Object>;
  public myPenBusiness: Array<Object>;
  
  loadOffliners:boolean=false;
  loadUploaders:boolean=false;
  loadPending:boolean=false;

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  latitude: any;
  longitude: any;
  findMeId: any;
  userId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sqlite: SQLite,
              private geolocation: Geolocation,
              public storage: Storage) {
                this.latitude = "";
                this.longitude = "";
            console.log('all expenses >>>',this.expenses);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadsPage');
    this.storage.get('username').then((userId) => {
      console.log('@offlinePage isLoggedIn >>>', userId);
      this.userId = userId;
      console.log('@offlinePage this.userId >>>', this.userId);
    });
    this.getData();
    this.setGeoLocation();
  }

  ionViewWillEnter() { this.getData(); }

  setGeoLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      console.log('position resp >> ', resp.coords);
    }).catch((error) => {
      // this.error = error;
      console.log('error: true',JSON.stringify(error));
    });
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY,userId TEXT,findMeId TEXT,officeName TEXT,otherNames TEXT,mobile TEXT,directory TEXT,latitude TEXT,longitude TEXT,gender TEXT,fileUpload TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense ORDER BY rowid DESC', {})
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,userId:res.rows.item(i).userId,findMeId:res.rows.item(i).findMeId,officeName:res.rows.item(i).officeName,otherNames:res.rows.item(i).otherNames,mobile:res.rows.item(i).mobile,directory:res.rows.item(i).directory,latitude:res.rows.item(i).latitude,longitude:res.rows.item(i).longitude,gender:res.rows.item(i).gender,fileUpload:res.rows.item(i).fileUpload})
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

  addData() { this.navCtrl.push("AddDataPage"); }
  
  editData(rowid) {
    this.navCtrl.push("EditDataPage", { rowid:rowid });
  }
  
  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}