import {Component, OnInit} from '@angular/core';
import {Router  } from '@angular/router';
import { DataService } from './shared/data.service';


@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [ RouterModule, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

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
