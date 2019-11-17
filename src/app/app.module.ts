import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsCardComponent } from './flights-card/flights-card.component';

@NgModule({
  imports:      [ BrowserModule,
                   FormsModule,
                   ReactiveFormsModule,
                   AppRoutingModule,
                   BrowserAnimationsModule
                  ],
  declarations: [ AppComponent, FlightsCardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
