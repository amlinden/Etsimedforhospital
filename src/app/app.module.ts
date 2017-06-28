//import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MdRadioModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



//material
//import { MdIconModule } from "@angular/material";



//components
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component'; //typescripts now know where to find it and it can be used
import { ServersComponent } from './servers/servers.component';
import { SearchComponent } from './search/search.component';
import { AgeComponent } from './age/age.component'; //typescripts now know where to find it and it can be used

const appRoutes: Routes = [
  { path: '', component: AppComponent}, //what should happen - component
  { path: 'age', component: AgeComponent},
  { path: 'search', component: SearchComponent},
]; //all routes, has to follow structure

@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    ServerComponent, //add here (but get error i you have not imported it FIRST)
    ServersComponent, SearchComponent, AgeComponent  
  ],
  imports: [ //imports - allows us to add other modules to this module
    BrowserModule,
    //MdIconModule,
    //MaterializeModule,
    FormsModule,
    MdRadioModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
