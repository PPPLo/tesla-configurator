import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable, switchMap, map, tap, startWith, Subscription } from 'rxjs';
import { Configuration, ModelConfiguration } from '../shared/models';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {

  selectedModel:string;
  selectedColor:string;
  imageUrl:string;
  model$:Observable<ModelConfiguration>;
  currentConfig$: Observable<Configuration>;

  selectedConfig: FormControl = new FormControl('default', {nonNullable:true});
  selectedTowHitchValue: FormControl = new FormControl();
  selectedYokeValue: FormControl = new FormControl();

  subYoke:Subscription;
  subTowHitch:Subscription;
  

  constructor(private dataService:DataService, private comService:CommunicationService){
    this.selectedModel=this.comService.currentState.selectedModel.code;
    this.selectedColor=this.comService.currentState.selectedColor.code;
    this.imageUrl=this.dataService.createImageUrl(this.selectedModel,this.selectedColor);
    this.model$=this.dataService.getModel(this.selectedModel);
    this.currentConfig$=this.selectedConfig.valueChanges.pipe(
      startWith('default'), 
      switchMap((option)=>this.findModelConfig(option)), 
      tap((value)=>this.comService.setConfig(value))
    );
    this.subTowHitch=this.selectedTowHitchValue.valueChanges.subscribe((value)=>this.comService.setHitch(value));
    this.subYoke=this.selectedYokeValue.valueChanges.subscribe((value)=>this.comService.setYoke(value));
  }

  findModelConfig(inputConfig:number):Observable<Configuration>{
    return this.model$.pipe(map((model)=>model.configs.find((config)=>config.id==inputConfig))) as Observable<Configuration>;
  }

}
