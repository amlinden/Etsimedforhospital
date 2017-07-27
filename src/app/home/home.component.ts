import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//firebase import statements
import { Routing } from "../app.routing";
//saknas med aouth? - JA lägger till under
//import { AuthService } from '../providers/auth.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
    //user = null;
  constructor(public auth: AuthService, public db: AngularFireDatabase, private router:Router) {  
    this.auth.getAuthState().subscribe(
    (auth) => {
      if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
          console.log("Logged in");
          console.log(auth);
          this.router.navigate(['']);
        }
      }
    );
    }

  

  
  logout() {
  
    this.auth.logout();
    this.user_displayName = '';
    this.user_email = '';
    this.router.navigate(['login']);
  }
  //do we need get aut?
  

  
}

