import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:"step1", component:Step1Component},
    {path:"step2", component:Step2Component, canActivate:[(component:AppComponent)=>!component.step2IsEnabled]},
    {path:"step3", component:Step3Component,  canActivate:[(component:AppComponent)=>!component.step3IsEnabled]},
    {path:"", redirectTo:'step1', pathMatch:'full'},
    {path:"**", redirectTo:'step1', pathMatch:'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }