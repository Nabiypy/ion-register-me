import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directory } from '../../models/directory.model';
import { Business } from './../../models/business.model';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl: any = 'http://localhost:9000';
  result: any;

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getDirectories() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/api/directories')
        .map(res => this.result = res)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createDirectory(post: Directory) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/api/directory', JSON.stringify(post))
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  RemoveDirectory(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + '/directory/remove/' + id).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }

  createBusiness(post: Business) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/api/business', JSON.stringify(post),{
        headers: new HttpHeaders({'Content-type':'application/json'})    
       })
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }


}

