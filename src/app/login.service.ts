import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService {
  private authorized = new BehaviorSubject<boolean>(false);
  constructor() {
  }
  subscibeToAuth(){
    return this.authorized;
  }
  login(username?, password?){
    this.authorized.next(true);
  }
  //jag använder en logout
  // logout(){
  //   this.authorized.next(false);
  // }
  
}
