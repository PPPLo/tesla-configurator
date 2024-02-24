import { Injectable } from '@angular/core';
import { CarModel, Color, Configuration, Model } from './models';
import { Observable, Subject } from 'rxjs';

export const EMPTY_MODEL:Model={
  code:"",
  description:""
}

export const EMPTY_COLOR={
  code:"",
  description:"",
  price: 0
}

export const EMPTY_CONFIG={
  id:0,
  description:"",
  range:0,
  speed:0,
  price:0,
}
const INITIAL_STATE={  
  selectedModel:EMPTY_MODEL,
  selectedColor:EMPTY_COLOR,
  selectedConfig:EMPTY_CONFIG,
  towChoice:"",
  yokeChoice:""
}

export interface CurrentState{
  selectedModel:Model;
  selectedColor:Color;
  selectedConfig:Configuration;
  towChoice:string;
  yokeChoice:string;
}

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  currentState:CurrentState = INITIAL_STATE;
  modelStatusSubject = new Subject<boolean>();
  observableModelStatus$ : Observable<boolean> = this.modelStatusSubject.asObservable();
  configStatusSubject = new Subject <boolean>();
  observableConfigStatus$ : Observable<boolean> =this.configStatusSubject.asObservable();

  constructor(){
}
  
  setModel(model:CarModel){
    this.resetState();
    this.currentState.selectedModel=model;
    this.modelStatusSubject.next(true);
    //console.log('set model:', this.currentState);  
  }

  setColor(color:Color){
    this.currentState.selectedColor=color;
    //console.log('set color', this.currentState);
  }

  setConfig(config:Configuration){
    this.currentState.selectedConfig = config;
    this.currentState.towChoice="";
    this.currentState.yokeChoice="";
    this.configStatusSubject.next(true);
    //console.log('set config:', this.currentState);
  }

  setHitch(hitchChoice:boolean){
    this.currentState.towChoice=hitchChoice.toString();
    //console.log('set setHitch', this.currentState);
  }
  setYoke(yokeChoice:boolean){
    this.currentState.yokeChoice=yokeChoice.toString();
    //console.log('setYoke', this.currentState);
  }

  getCurrentState():CurrentState{
    return this.currentState;
  }

  resetState(){
    this.currentState=Object.assign({}, INITIAL_STATE); 
    this.modelStatusSubject.next(false);
    this.configStatusSubject.next(false);
    //console.log('reset model:', this.currentState); 
  }

}
