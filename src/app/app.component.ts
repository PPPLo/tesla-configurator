import {Component, OnInit} from '@angular/core';
import {Router  } from '@angular/router';
import { DataService } from './shared/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {

  modelChoice:string = '';

  constructor(private router:Router, private data:DataService){
  }

  navigateToStep1(){
    this.router.navigate(['step1']);
  }

  navigateToStep2(){
    this.modelChoice=this.data.latestModelCoice;
    console.log('app'+ this.modelChoice);
    this.router.navigate(['step2', this.modelChoice]);
  }

  navigateToStep3(){
    this.router.navigate(['step3']);
  }

  ngOnInit(): void {
  }

}
