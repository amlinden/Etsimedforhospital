import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import 'hammerjs';
//firebase



import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {MdTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk';  
import {CdkTableModule} from '@angular/cdk';  


//Material
import { MdButtonModule, MaterialModule, MdMenuModule} from '@angular/material';
import {MaterialChipsModule} from 'angular2-material-chips';

//Routing
import { Routing } from "./app.routing";
import { AuthGuard } from "./auth.guard";

//import { Routing } from "./app.routing";
//Services
import { SearchService } from "./search.service";
import { LoginService } from "./login.service";
import { DiagnoseService } from "./diagnose.service";

//import { AuthService } from './providers/auth.service';
import { AuthService } from './shared/auth.service';


//Components
import { AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { AgesexComponent } from './agesex/agesex.component';
import { QuestionsComponent } from './questions/questions.component';
import { DiagnoseComponent } from './diagnose/diagnose.component';
import { ResultComponent } from './result/result.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegistrationComponent } from './registration/registration.component';
import { DevComponent } from './dev/dev.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { }
// ];

@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SymptomsComponent,
    AgesexComponent,
    QuestionsComponent,
    DiagnoseComponent,
    ResultComponent,
    FeedbackComponent,
    RegistrationComponent,
    DevComponent
  ],
  imports: [ //imports - allows us to add other modules to this module
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    MaterialChipsModule, 
    MdButtonModule,
    MdMenuModule,
    MdTableModule,
    CdkTableModule,
    Routing,
    AngularFireModule.initializeApp(environment.firebase, 'etsimed'),// Updated version looks like that
    //AngularFireModule.initializeApp(firebaseConfig), 
    //from update firebase 4.0
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    SearchService,
    LoginService,
    AuthService,
    DiagnoseService,
    AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
