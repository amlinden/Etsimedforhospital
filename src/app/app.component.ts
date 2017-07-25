import { Component, OnInit} from '@angular/core';
//Routingm ()- ska detta var i app rputing???
import { Routing } from "./app.routing";
//saknas med aouth? - JA lägger till under
import { Router } from '@angular/router';
//import { AuthService } from '../providers/auth.service';
import { AuthService } from './shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private isLoggedIn: Boolean;
    topics: FirebaseListObservable<any[]>;

    user = null;
    private user_displayName: String;
    private user_email: String;
    
    constructor(private auth: AuthService, public db: AngularFireDatabase, private router:Router) {  }
  
    ngOnInit() {
      this.auth.getAuthState().subscribe (
        (user)=> this.user = user);
        this.isLoggedIn = true;
    //       this.user_displayName = auth.displayName;
    //       this.user_email = auth.email;
    //       console.log("Logged in");
    //       console.log(auth);
    //       this.router.navigate(['']);
    }

  
    logout() {
      this.auth.logout();
      this.user_displayName = '';
      this.user_email = '';
      this.router.navigate(['login']);
    }
    //do we need get aut?
    

  
}




    // this.auth.getAuthState().subscribe (
    //  //this.AuthService.af.auth.subscribe(
    //   //fransk vill ha title topics ets oc  ngoninit
    //   (auth) => {
    //     if (auth == null){
    //       //not logedin
    //       console.log("Logged out");

    //       this.isLoggedIn = false;
    //       //reset user
    //       this.user_displayName = '';
    //       this.user_email = '';
    //       this.router.navigate(['login']);
    //     } else {
    //       //logedin
    //       this.isLoggedIn = true;
    //       this.user_displayName = auth.displayName;
    //       this.user_email = auth.email;
    //       console.log("Logged in");
    //       console.log(auth);
    //       this.router.navigate(['']);
    //     }
    //   }

    // );