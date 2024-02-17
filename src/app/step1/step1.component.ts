import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ CommonModule],
  providers: [ DataService],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})

export class Step1Component implements OnInit{

  selectedModel:string='';
  selectedColor:string='';
  // models$ : Observable<string>;
  // colors$ : Observable<string>;

  constructor(private dataService: DataService){
  }

  ngOnInit(): void {
    //this.dataService.getData();
    console.log('on init');
  }

}
