import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import {Router, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { DataService } from './shared/data.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private router:Router, private data:DataService){}

  navigateTo(route: string){
    console.log(route);
    this.router.navigate([route]);
  }

  ngOnInit(): void {
  }

}
