import { Component } from '@angular/core';
import { CommunicationService, CurrentState } from '../shared/communication.service';

const TOW_YOKE_PRICE=1000;

@Component({
  selector: 'app-step3',
  //standalone: true,
  // imports: [],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {

  currentSelection:CurrentState;
  towYokePrice = TOW_YOKE_PRICE;
  totalCost : number = 0;

  constructor(private comService:CommunicationService){
    this.currentSelection=this.comService.getCurrentState();
    this.totalCost = this.currentSelection.selectedConfig.price+this.currentSelection.selectedColor.price+(Number(this.currentSelection.towChoice)+Number(this.currentSelection.yokeChoice))*this.towYokePrice
  }

}
