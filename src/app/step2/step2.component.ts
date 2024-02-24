import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable, switchMap, map, tap, startWith, Subscription } from 'rxjs';
import { Configuration, ModelConfiguration } from '../shared/models';
import { FormControl } from '@angular/forms';
import { CommunicationService, EMPTY_CONFIG } from '../shared/communication.service';

const DEFAULT_CONFIG='default';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {

  imageUrl:string;
  model$:Observable<ModelConfiguration>;
  currentConfig$: Observable<Configuration>;

  selectedConfig: FormControl = new FormControl(this.getDefaultConfig(), {nonNullable:true});
  selectedTowHitchValue: FormControl = new FormControl(this.getDefaultHitch(),{nonNullable:true});
  selectedYokeValue: FormControl = new FormControl(this.getDefaultYoke(),{nonNullable:true});

  subYoke:Subscription;
  subTowHitch:Subscription;
  formWasChanged!:boolean;

  constructor(private dataService:DataService, private comService:CommunicationService){
    let selectedModel = this.comService.currentState.selectedModel.code;
    let selectedColor = this.comService.currentState.selectedColor.code;
    this.imageUrl = this.dataService.createImageUrl(selectedModel,selectedColor);
    this.model$ = this.dataService.getModel(selectedModel);

    if(this.getDefaultConfig() === DEFAULT_CONFIG){
      this.currentConfig$ = this.selectedConfig.valueChanges.pipe( 
          switchMap((option) => this.findModelConfig(option)), 
          tap((value) => {
                      this.comService.setConfig(value);
                      if(!this.formWasChanged) this.formWasChanged=true;
                      this.selectedTowHitchValue.setValue("");
                      this.selectedYokeValue.setValue("");
          })
      );
      this.subTowHitch = this.selectedTowHitchValue.valueChanges.subscribe((value) => this.comService.setHitch(value));
      this.subYoke = this.selectedYokeValue.valueChanges.subscribe((value) => this.comService.setYoke(value));
    }
    else{
      this.currentConfig$ = this.selectedConfig.valueChanges.pipe( 
          startWith(this.comService.getCurrentState().selectedConfig.id),
          switchMap((option) => this.findModelConfig(option)), 
          tap((value) => {
              this.comService.setConfig(value);
              if(!this.formWasChanged) this.formWasChanged = true;
              this.selectedTowHitchValue.setValue("");
              this.selectedYokeValue.setValue("");
          })
      );
      this.subTowHitch = this.selectedTowHitchValue.valueChanges.pipe(startWith(this.comService.getCurrentState().towChoice)).subscribe((value) =>
          this.comService.setHitch(value));
      this.subYoke = this.selectedYokeValue.valueChanges.pipe(startWith(this.comService.getCurrentState().yokeChoice)).subscribe((value) =>
          this.comService.setYoke(value));

    }
  }

  findModelConfig(inputConfig:number):Observable<Configuration>{
    return this.model$.pipe(map((model) => model.configs.find((config) => config.id == inputConfig))) as Observable<Configuration>;
  }

  getDefaultConfig():string{
    let config = this.comService.currentState.selectedConfig;
    if(config === EMPTY_CONFIG) return DEFAULT_CONFIG;
    else {
      this.formWasChanged=true;
      return config.id.toString();
    }
  }

  getDefaultHitch():boolean{
    let hitch = this.comService.getCurrentState().towChoice;
    if(hitch === ''){
      return false;
    }
    else{
      return hitch === 'true' ? true : false;
    }
  }

  getDefaultYoke():boolean{
    let yoke = this.comService.getCurrentState().yokeChoice;
    if(yoke === ''){
      return false;
    }
    else{
      return yoke === "true" ? true : false;
    }
  }

}
