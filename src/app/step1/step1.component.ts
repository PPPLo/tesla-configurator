
import { Component, OnDestroy} from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable, Subscription, combineLatest, map, startWith, switchMap, tap } from 'rxjs';
import { CarModel, Color } from '../shared/models';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '../shared/communication.service';

const DEFAULT_COLOR = 'white';
const DEFAULT_MODEL = 'default'

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnDestroy{

  colors$: Observable<Color[]>;
  colors!:Color[];
  colorsSub:Subscription;
  formWasChanged!:boolean;
  models$: Observable <CarModel[]>;
  selectedModelControl:FormControl = new FormControl(DEFAULT_MODEL,{nonNullable: true});
  selectedColorControl:FormControl = new FormControl(DEFAULT_COLOR, {nonNullable: true});
  selectedModel$:Observable<CarModel>;
  selectedColor$!:Observable<Color>;
  selectedImageUrl$:Observable<string>;
  selectedColorSub:Subscription;


  constructor(private dataService: DataService, private comService: CommunicationService){
    this.comService.resetState();

    this.models$ = this.dataService.models$;

    this.selectedModel$ = this.selectedModelControl.valueChanges.pipe(
          switchMap((value) => this.getSelectedModel(value)),
          tap((model) => { 
              this.selectedColorControl.reset();
              this.comService.setModel(model);
              this.comService.setColor(model.colors[0]);
              if(!this.formWasChanged) {this.formWasChanged = true};
          }),
    );

    this.colors$ = this.selectedModel$.pipe(map((model) => model.colors));

    this.selectedColor$ = combineLatest([this.colors$, this.selectedColorControl.valueChanges.pipe(startWith(DEFAULT_COLOR))]).pipe(
          map(([colors,selectedColor]) => this.getSelectedColor(colors, selectedColor)), 
          tap((val) => {
              this.comService.setColor(val);
          })
    );

    this.selectedImageUrl$ = this.dataService.getImageUrl(this.selectedModelControl.valueChanges, this.selectedColorControl.valueChanges);
    
    this.colorsSub = this.colors$.subscribe((colors) => this.colors = colors);

    this.selectedColorSub = this.selectedColor$.subscribe();
 }

  getSelectedModel(modelName: string):Observable<CarModel>{
      return this.models$.pipe(map((models) => models.find((model) => model.code === modelName))) as Observable<CarModel>;
  }

  getSelectedColor(colors: Color[], selectedColor:string):Color{ 
    return colors.find((color) => color.code === selectedColor) as Color;
  }

  ngOnDestroy(): void {
    this.colorsSub.unsubscribe();
    this.selectedColorSub.unsubscribe();
  }
}
