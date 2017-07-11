import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _LoginService: LoginService){
    
  }
  onsubmit(){
    console.log('submitted');
  }
  login(){
    this._LoginService.login();
  }

  ngOnInit() {
  }

}
