import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step1Component } from './step1/step1.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [ 
        AppComponent,
        Step1Component,
        Step2Component,
        Step3Component
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ]
})

export class AppModule { }