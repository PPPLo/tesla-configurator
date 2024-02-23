import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router  } from '@angular/router';
import { DataService } from './shared/data.service';
import { CommunicationService } from './shared/communication.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit, OnDestroy {

  step2IsEnabled:boolean=false;
  step3IsEnabled:boolean=false;
  subStep2Status:Subscription;
  subStep3Status:Subscription;

  constructor(private router:Router, private data:DataService, private comService:CommunicationService){
    this.subStep2Status=this.comService.observableModelStatus$.subscribe((status)=>{this.step2IsEnabled=status; console.log('step2 is enabled: ', status)});
    this.subStep3Status=this.comService.observableConfigStatus$.subscribe((status)=>{this.step3IsEnabled=status; console.log('step 3 is enabled:', status) })
  }

  navigateTo(option:string){
    this.router.navigate([option]);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subStep2Status.unsubscribe();
    this.subStep3Status.unsubscribe();
  }

}
