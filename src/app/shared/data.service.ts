import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { CarModel, ModelConfiguration } from './models';

const IMAGE_URL = 'https://interstate21.com/tesla-app/images/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient){}

  //get car models
  models$  = this.http.get<CarModel[]>('/models');

  //get image url
  getImageUrl(model$ : Observable<string>,color$:  Observable<string>): Observable<string>{
    return combineLatest([model$,color$]).pipe(map(([model,color])=>this.createImageUrl(model, color)));
  }

  //create image url
  createImageUrl(model : string, color: string): string{
    let imageUrl = IMAGE_URL + model + '/'+ color+'.jpg';
    return imageUrl;
  
  }

  latestModelCoice: string = '';

  //setLatestModel
  setLatestModelChoice(model:string){
    console.log(model);
    this.latestModelCoice=model;
  }


  //get model options
  getModel(value:string):Observable<ModelConfiguration>{
    let url='/options/'+ value;
    //return this.http.get<ModelConfiguration>('/options/X');
    console.log('get model ' + url);
    return this.http.get<ModelConfiguration>(url);
  }
  



}
