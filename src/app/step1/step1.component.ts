
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-step1',
  // standalone: true,
  // imports: [ CommonModule, AsyncPipe, JsonPipe],
  // providers: [ ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit{

  selectedModel:string='';
  selectedColor:string='';
  //models$: Observable <any>;
  // colors$ : Observable<string>;

  // constructor(private dataService: DataService){
  //   this.models$=this.dataService.models$;
  //   let sub = this.models$.subscribe((val)=>console.log('from sebsce'+ val));
  //   console.log(this.models$);
  // }

  ngOnInit(): void {
  }

}
