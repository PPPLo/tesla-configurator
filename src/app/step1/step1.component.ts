
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { EMPTY, Observable, Subscription, combineLatest, filter, find, map, startWith, switchMap, tap } from 'rxjs';
import { CarModel, Color } from '../shared/models';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-step1',
  // standalone: true,
  // imports: [ CommonModule, AsyncPipe, JsonPipe],
  // providers: [ ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit, OnDestroy{

  selectedModel:FormControl = new FormControl('Select a model');
  selectedColor:FormControl = new FormControl('Select a color');

  selectedModel$:Observable<CarModel>;
  selectedColor$:Observable<Color>;
  selectedImageUrl$!:Observable<string>
  models$: Observable <CarModel[]>;
  colors$: Observable<Color[]>;
  colors!:Color[];
  colorsSub : Subscription;

  constructor(private dataService: DataService){
    this.models$=this.dataService.models$;
    this.selectedModel$=this.selectedModel.valueChanges.pipe(switchMap((value)=>this.getSelectedModel(value)));
    this.selectedColor$=this.selectedColor.valueChanges.pipe(switchMap((value)=>this.getSelectedColor(value)));
    this.colors$=this.selectedModel$.pipe(map((model)=>model.colors));
    this.colorsSub=this.colors$.subscribe((val)=>this.colors=val);
    //this.selectedImageUrl$=combineLatest([this.selectedModel$,this.selectedColor$]).pipe(switchMap(([model,color])=>this.dataService.getImageUrl(model.code, color.code)));
    //this.selectedImageUrl$=this.dataService.getImageUrl();
  }

  ngOnInit(): void {
    this.selectedImageUrl$=this.dataService.getImageUrl();
  }

  getSelectedModel(modelName: string):Observable<CarModel>{
    return this.models$.pipe(map((models)=>models.find((model)=>model.code===modelName))) as Observable<CarModel>;
  }

  getSelectedColor(colorName: string): Observable<Color>{
    return this.colors$.pipe(map((colors)=>colors.find((color)=>color.code===colorName))) as Observable<Color>;
  }

  ngOnDestroy(): void {
    this.colorsSub.unsubscribe();
  }

}
