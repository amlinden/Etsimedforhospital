import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl} from "@angular/forms";
import { SearchService } from "../search.service";
import { LoginService } from "../login.service";
import { Observable, Subject } from 'rxjs';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  myControl: FormControl;
  error: boolean = false; 
  symptoms: Array<any> = [];
  option: object;
  options: Array<any>;
  filteredOptions: Observable<object[]>;
  //theObservable : Observable<any[]> = Observable.of(this.options);
  //theSubject = new Subject<Array<any>>();
  //theSubscription = this.theSubject.subscribe(
  //  data => this.theObservable=Observable.of(data)
  //)
  constructor(
    private _SearchService: SearchService,
    public dialog: MdDialog, 
    public vcr: ViewContainerRef,
    private _LoginService: LoginService) {
    this.myControl = new FormControl();
    
  }
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
/*
  onKey(event: any){
    console.log(event.target.value);
    if (event.target !== undefined){
      this._SearchService.getAutoComplete(event.target.value.toLowerCase())
        .subscribe(
          data => this.options = this.filterResponse(data)
        )
    }
  }

  compareInput(input){
    console.log(this.symptoms);
    if (this.options.length > 0){
      if (this.options[0].name.toLowerCase() === input.toLowerCase() ){
        console.log("it's the same");
        this.error = false;
        this.addSymptom(this.options[0]);
      }else{
        console.log('sorry, its an error');
        this.error = true;
      }
    } else {
      console.log('Also an error');
      this.error = true;
    }
  }
  
  addSymptom(symptom){
    let exists = false; 
    for (let i = 0; i < this.symptoms.length; i++){
      if (this.symptoms[i].id === symptom.id){
        exists = true;
      }
    }
    if(exists===false){
      this.symptoms.push(symptom);
      this.myControl.reset();
    }
  }
  removeSymptom(symptomID){
    console.log('heyyaaa', symptomID);
    for (let i=0;i<this.symptoms.length; i++){
      if(this.symptoms[i].id === symptomID){
        console.log('found it!');
        this.symptoms.splice(i, 1);
      }
    }
  }
  
  getMatches(query){
    let matches: Array<any>;
    this._SearchService.getAutoComplete(query.toLowerCase())
      .subscribe(
        data => {
          matches = this.filterResponse(data)
        }
      )

    return matches;
  }

  filterResponse(object) {
    let myArray: object[] = [];

    if(object.length > 0 && object !== undefined ){
      let limit = 5;
      if(object.length < 6){
        limit = object.length;
      }
      for(let i = 0; i < limit; i++){
        myArray.push(object[i]);
      }
    }
    return myArray;
  }
*/
  ngOnInit() {
    /*
    this.filteredOptions = this.myControl.valueChanges
         .map( data => {
           return this.getMatches(data);
          })
    this.filteredOptions.subscribe( data => this.options = data);
    */
  }

}