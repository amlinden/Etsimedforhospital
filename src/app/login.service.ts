import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

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
  logout(){
    this.authorized.next(false);
  }
  
}
