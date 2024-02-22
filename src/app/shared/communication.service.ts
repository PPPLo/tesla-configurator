import { Injectable } from '@angular/core';
import { CarModel, Color, Configuration } from './models';

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
    "id":0,
    "description":"",
    "range":0,
    "speed":0,
    "price":0,
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

  constructor(){
}
  
  setModel(model:CarModel){
    this.currentState.selectedModel.code=model.code;
    this.currentState.selectedModel.description=model.description
  }

  setColor(color:Color){
    this.currentState.selectedColor=color;
  }

  setConfig(config:Configuration){
    this.currentState.selectedConfig = config;
  }

  setTow(towChoice:boolean){
    this.currentState.towChoice=towChoice;
  }
  setHitch(yokeChoice:boolean){
    this.currentState.yokeChoice=yokeChoice;
  }

  getConfig():CurrentState{
    return this.currentState;
  }

  resetState(){
    this.currentState=INITIAL_STATE;
  }

}
