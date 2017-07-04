import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import 'hammerjs';

//Material
import { MdButtonModule, MaterialModule, MdMenuModule} from '@angular/material';

//Components
import { AppComponent, LoginDialog } from './app.component';
import { SearchComponent } from './search/search.component'; //typescripts now know where to find it and it can be used
import { LoginComponent } from './login/login.component';

//Services
import { SearchService } from "./search.service";
import { LoginService } from "./login.service";


@NgModule({ //Register components so nh module knows
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    LoginDialog
  ],
  entryComponents: [
    AppComponent,
    LoginDialog
  ],
  imports: [ //imports - allows us to add other modules to this module
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    MdButtonModule,
    MdMenuModule
  ],
  providers: [
    SearchService,
    LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
