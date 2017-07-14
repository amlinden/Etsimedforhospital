import { Component, OnInit } from '@angular/core';
import { FormControl } from  '@angular/forms';
import { SearchService } from "../search.service";
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})

export class SymptomsComponent implements OnInit {
  symptoms: Array<any> = [];
  myControl: FormControl;
  options: Array<any>;
  error: boolean = false; 
  filteredOptions: Observable<object[]>;

  constructor(private _SearchService: SearchService) {
    this.myControl = new FormControl();
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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .map( data => {
        return this.getMatches(data);
      });

    this.filteredOptions.subscribe( data => this.options = data);
  }

}
