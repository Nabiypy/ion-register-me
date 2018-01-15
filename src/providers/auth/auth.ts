import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  result: any;
  baseUrl: any = 'http://localhost:9000';
  public token: any;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }


  createAccount(details) {

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post('/api/signup', JSON.stringify(details), { headers: headers })
        .subscribe(res => {
          let data = res;
          this.token = data;
          this.storage.set('token', data);
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials) {

    return new Promise((resolve, reject) => {
      // const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      this.http.post(this.baseUrl+'/api/authentication', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          let data = res;
          this.token = data;
          this.storage.set('token', data);
          resolve(data);
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  logout() {
    this.storage.set('token', '');
  }

  isLoggedIn() {
    return this.storage.get('token').then(value =>{
      this.token = value;
      console.log('isLoggedIn >>>', this.token);
    })
  }

}
