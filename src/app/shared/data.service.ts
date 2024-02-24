import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEVER, Observable, catchError, combineLatest, map } from 'rxjs';
import { CarModel, ModelConfiguration } from './models';

const IMAGE_URL = "https://interstate21.com/tesla-app/images/";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http:HttpClient){}

  models$ : Observable<CarModel[]> = this.http.get<CarModel[]>("/models").pipe(catchError(()=>this.handleModelsErr()));

  getImageUrl(model$ : Observable<string>,color$:  Observable<string>): Observable<string>{
    return combineLatest([model$,color$]).pipe(map(([model,color])=>this.createImageUrl(model, color)));
  }

  createImageUrl(model : string, color: string): string{
    let imageUrl = IMAGE_URL + model + "/" + color + ".jpg";
    return imageUrl;
  }

  getModel(value:string):Observable<ModelConfiguration>{
    let url = "/options/" + value;
    return this.http.get<ModelConfiguration>(url).pipe(catchError(()=>this.handleModelErr()));
  }

  handleModelsErr():Observable<CarModel[]>{
    return NEVER;
  }

  handleModelErr():Observable<ModelConfiguration>{
    return NEVER;
  }


  



}
