import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  // data = { rowid:0, date:"", type:"", description:"", amount:0 };
  data = { rowid:0, userId:"", findMeId:"", officeName:"", otherNames:"", mobile:"", directory:"", latitude:"", longitude:"", gender:"", fileUpload:""};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.userId = res.rows.item(0).userId;
            this.data.findMeId = res.rows.item(0).findMeId;
            this.data.officeName = res.rows.item(0).officeName;
            this.data.otherNames = res.rows.item(0).otherNames;
            this.data.mobile = res.rows.item(0).mobile;
            this.data.directory = res.rows.item(0).directory;
            this.data.latitude = res.rows.item(0).latitude;
            this.data.longitude = res.rows.item(0).longitude;
            this.data.gender = res.rows.item(0).gender;
            this.data.fileUpload = res.rows.item(0).fileUpload;
          }
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

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET findMeId=?,officeName=?,otherNames=?,mobile=?,directory=?,latitude=?,longitude=?,gender=?,fileUpload=? WHERE rowid=?',[
        this.data.findMeId,
        this.data.officeName,
        this.data.otherNames,
        this.data.mobile,
        this.data.directory,
        this.data.latitude,
        this.data.longitude,
        this.data.gender,
        this.data.fileUpload
      ]).then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
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