import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import 'hammerjs';
import {MdMenuModule} from '@angular/material';



//Material
import { MdButtonModule, MaterialModule,} from '@angular/material';

//Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component'; //typescripts now know where to find it and it can be used

//Services
import { SearchService } from "./search.service";

@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [ //imports - allows us to add other modules to this module
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    MdButtonModule,
    MdMenuModule,
  ],
  providers: [
    SearchService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
