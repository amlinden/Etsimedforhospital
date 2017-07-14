import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import 'hammerjs';

//Material
import { MdButtonModule, MaterialModule, MdMenuModule} from '@angular/material';

//Routing
import { Routing } from "./app.routing";

//Services
import { SearchService } from "./search.service";
import { LoginService } from "./login.service";

//Components
import { AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { AgesexComponent } from './agesex/agesex.component';
import { QuestionsComponent } from './questions/questions.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';

@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SymptomsComponent,
    AgesexComponent,
    QuestionsComponent,
    DiagnoseComponent
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
    Routing
  ],
  providers: [
    SearchService,
    LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
