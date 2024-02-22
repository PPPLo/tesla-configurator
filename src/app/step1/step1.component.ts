
import { Component, OnDestroy, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { DataService } from '../shared/data.service';
import { EMPTY, NEVER, Observable, Subscription, catchError, combineLatest, map, switchMap, tap } from 'rxjs';
import { CarModel, Color } from '../shared/models';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '../shared/communication.service';

const DEFAULT_COLOR = 'white';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit, OnDestroy{

  selectedModel:FormControl = new FormControl('default',{nonNullable: true});
  selectedColor:FormControl = new FormControl(DEFAULT_COLOR,  {nonNullable: true});

  selectedModel$:Observable<CarModel>;
  selectedColor$!:Observable<Color>;
  selectedImageUrl$:Observable<string>;

  //selectedColor: Color;

  models$: Observable <CarModel[]>;
  colors$: Observable<Color[]>;
  colors!:Color[];

  formModelSub: Subscription;
  formColorSub: Subscription;
  colorsSub:Subscription;

  constructor(private dataService: DataService, private comService: CommunicationService){

    this.models$=this.dataService.models$;
    this.selectedModel$=this.selectedModel.valueChanges.pipe(switchMap((value)=>this.getSelectedModel(value)));
    //this.selectedColor$=this.selectedColor.valueChanges.pipe(switchMap((value)=>this.getSelectedColor(value)));
    this.colors$=this.selectedModel$.pipe(map((model)=>model.colors));
    this.selectedImageUrl$=this.dataService.getImageUrl(this.selectedModel.valueChanges, this.selectedColor.valueChanges);

    this.colorsSub=this.colors$.subscribe((colors)=>this.colors=colors);

    this.formModelSub=this.selectedModel.valueChanges.subscribe((value)=>{
        this.selectedColor.reset(); 
        this.comService.setModel(value);
        this.dataService.setLatestModelChoice(value);});

    this.formColorSub=this.selectedColor.valueChanges.subscribe((value)=> {
        this.selectedColor$=this.getSelectedColor(value);
    }
        );
        
  }

  ngOnInit(): void {

  }

  getSelectedModel(modelName: string):Observable<CarModel>{
    return this.models$.pipe(map((models)=>models.find((model)=>model.code===modelName))) as Observable<CarModel>;
  }

  getSelectedColor(colorName: string): Observable<Color>{
    return this.colors$.pipe(map((colors)=>colors.find((color)=>color.code===colorName))) as Observable<Color>;
  }

  ngOnDestroy(): void {
    this.colorsSub.unsubscribe();
    this.formModelSub.unsubscribe();
    this.formModelSub.unsubscribe();

  }

}
