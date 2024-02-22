import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable, switchMap, map, tap, startWith } from 'rxjs';
import { Configuration, ModelConfiguration } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {

  model$:Observable<ModelConfiguration>;
  currentConfig$: Observable<Configuration>;
  selectedConfig: FormControl = new FormControl('1', {nonNullable:true});
  selectedTowHitchValue: FormControl = new FormControl();
  selectedYokeValue: FormControl = new FormControl();

  constructor(private dataService:DataService, private activatedRoute:ActivatedRoute){
    let paramId=this.activatedRoute.snapshot.paramMap.get('id')?.toLowerCase();
    this.model$=this.dataService.getModel(paramId!);
    //this.currentConfig$=startWith(this.model$.pipe((map((model)=>model.configs[0]))));
    this.currentConfig$=this.selectedConfig.valueChanges.pipe(startWith('1'), switchMap((option)=>this.model$.pipe(map((model)=>model.configs.find((config)=>config.id==option))))) as Observable<Configuration>;
    
  }

}
