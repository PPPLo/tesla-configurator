import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CarModel } from './models';

const IMAGE_URL = 'https://interstate21.com/tesla-app/images/';
const IMAGE_URL_TEST = 'https://interstate21.com/tesla-app/images/3/red.jpg'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient){}

  //get car models
  models$  = this.http.get<CarModel[]>('/models');

  //get image url
  getImageUrl(/*model : string, color: string*/): Observable<any>{
    //console.log('entered service' + model + color);
    //return this.http.get(IMAGE_URL + model + '/' + color + '.jpg' );
    return this.http.get<Observable<any>>(IMAGE_URL_TEST );
  }

  //get models

  //get model options



}
