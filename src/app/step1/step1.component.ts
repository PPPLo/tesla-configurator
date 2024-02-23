
import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable, Subscription, combineLatest, map, startWith, switchMap, tap } from 'rxjs';
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

  selectedModelControl:FormControl = new FormControl('default',{nonNullable: true});
  selectedColorControl:FormControl = new FormControl(DEFAULT_COLOR,  {nonNullable: true});

  selectedModel$:Observable<CarModel>;
  selectedColor$!:Observable<Color>;
  selectedImageUrl$:Observable<string>;

  models$: Observable <CarModel[]>;
  colors$: Observable<Color[]>;
  colors!:Color[];

  colorsSub:Subscription;
  selectedColorSub:Subscription;
  formWasChanged:boolean=false;

  constructor(private dataService: DataService, private comService: CommunicationService){

    this.comService.resetState();
    this.models$=this.dataService.models$;
    this.selectedModel$=this.selectedModelControl.valueChanges.pipe(
      switchMap((value)=>this.getSelectedModel(value)),
      tap((model)=>{ 
      this.selectedColorControl.reset();
      this.comService.setModel(model);
      if (this.formWasChanged===false){
        this.formWasChanged=true;
      }
    }));
    this.colors$=this.selectedModel$.pipe(map((model)=>model.colors));
    this.selectedColor$=combineLatest([this.colors$, this.selectedColorControl.valueChanges.pipe(startWith('1'))]).pipe(
      map(([colors,selectedColor])=>this.getSelectedColor(colors, selectedColor)), 
      tap((val)=>{
        console.log('hello', val);
        this.comService.setColor(val);
      })
       ) ;
    this.selectedImageUrl$=this.dataService.getImageUrl(this.selectedModelControl.valueChanges, this.selectedColorControl.valueChanges);

    this.colorsSub=this.colors$.subscribe((colors)=>this.colors=colors);
    this.selectedColorSub=this.selectedColor$.subscribe();

 }

  ngOnInit(): void {

  }

  getSelectedModel(modelName: string):Observable<CarModel>{
    return this.models$.pipe(map((models)=>models.find((model)=>model.code===modelName))) as Observable<CarModel>;
  }

  getSelectedColor(colors:Color[], selectedColor:string):Color{
    return colors.find((color)=>color.code===selectedColor) as Color;
  }

  ngOnDestroy(): void {
    this.colorsSub.unsubscribe();
    this.selectedColorSub.unsubscribe();

  }

}
