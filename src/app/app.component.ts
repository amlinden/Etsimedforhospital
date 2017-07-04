import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
@Component({
  selector: 'login-dialog',
  template: '<app-login></app-login>',

})
export class LoginDialog {
  constructor(private _LoginService: LoginService){
    
  }
  login(){
    this._LoginService.login();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    selectedOption: string;
    
    constructor(
      public dialog: MdDialog, 
      public vcr: ViewContainerRef, 
      private _LoginService: LoginService
    ){}
    openDialog() {
      const config = new MdDialogConfig();
      config.viewContainerRef = this.vcr;
      config.disableClose = true;
      this._LoginService.logout();
      let dialogRef = this.dialog.open(LoginDialog, config);
      this._LoginService.subscibeToAuth().subscribe(data => {
        if(data){
          console.log("closing diag", data);
          dialogRef.close();
        }
      });
    //let dialogRef = this.dialog.open(LoginComponent);
      //dialogRef.afterClosed().subscribe(result => {
      //  this.selectedOption = result;
      //});
    }
    ngOnInit() {
      this.openDialog();
    }
}
