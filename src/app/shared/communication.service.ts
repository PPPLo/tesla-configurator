import { Injectable } from '@angular/core';
import { CarModel, Color, Configuration } from './models';
import { Observable, Subject, startWith } from 'rxjs';

const INITIAL_STATE={  
  selectedModel:{
    code:'',
    description:''
  },
  selectedColor:{
    code:'',
    description:'',
    price:0
  },
  selectedConfig:{
    id:0,
    description:"",
    range:0,
    speed:0,
    price:0,
  },
  towChoice:false,
  yokeChoice:false
}


export interface CurrentState{
  selectedModel:{
    code:string;
    description:string;
  }
  selectedColor:Color;
  selectedConfig:Configuration;
  towChoice:boolean;
  yokeChoice:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  currentState:CurrentState = INITIAL_STATE;
  modelStatusSubject = new Subject<boolean>();
  observableModelStatus$ : Observable<boolean> = this.modelStatusSubject.asObservable().pipe(startWith(false));
  configStatusSubject = new Subject <boolean>();
  observableConfigStatus$ : Observable<boolean> =this.configStatusSubject.asObservable().pipe(startWith(false));

  constructor(){
}
  
  setModel(model:CarModel){
      this.resetState();
      this.currentState.selectedModel.code=model.code;
      this.currentState.selectedModel.description=model.description;
      this.modelStatusSubject.next(true);
      console.log(this.currentState);  
  }

  setColor(color:Color){
    this.currentState.selectedColor=color;
    console.log(this.currentState);
  }

  setConfig(config:Configuration){
    this.currentState.selectedConfig = config;
    this.configStatusSubject.next(true);
    console.log(this.currentState);
  }

  setHitch(hitchChoice:boolean){
    this.currentState.towChoice=hitchChoice;
    console.log(this.currentState);
  }
  setYoke(yokeChoice:boolean){
    this.currentState.yokeChoice=yokeChoice;
    console.log(this.currentState);
  }

  getCurrentState():CurrentState{
    return this.currentState;
  }

  resetState(){
    this.currentState=INITIAL_STATE;
    this.modelStatusSubject.next(true);
  }

}
