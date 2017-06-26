//import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { requestOptionsProvider } from "./default-request-options.service";
import 'hammerjs';

//material
//import { MdIconModule } from "@angular/material";
import { MaterialModule } from '@angular/material';

//Libraries
import { NguiAutoCompleteModule } from "@ngui/auto-complete";

//components
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component'; //typescripts now know where to find it and it can be used
import { ServersComponent } from './servers/servers.component';
import { SearchComponent } from './search/search.component'; //typescripts now know where to find it and it can be used

//Service
import { SearchService } from "./search.service";

@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    ServerComponent, //add here (but get error if you have not imported it FIRST)
    ServersComponent, 
    SearchComponent
  ],
  imports: [ //imports - allows us to add other modules to this module
    BrowserModule,
    BrowserAnimationsModule,
    //MdIconModule,
    //MaterializeModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    MaterialModule,
  ],
  providers: [
    SearchService,
    requestOptionsProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
