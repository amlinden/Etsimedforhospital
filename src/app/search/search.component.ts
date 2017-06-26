import { Component, OnInit } from '@angular/core';
import { FormControl} from "@angular/forms";
import { SearchService } from "../search.service";
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myControl: FormControl;

  searchQuery: string = '';
  //autocompleteList: Array<string> = [];
  autocompleteList = ['Loss of Appetite',
    'Loss of Speech'];

  option: string;
  options: Array<any> = ['Start typing to see symptoms'];
  filteredOptions: Observable<string[]>;
  //theObservable : Observable<any[]> = Observable.of(this.options);
  //theSubject = new Subject<Array<any>>();
  //theSubscription = this.theSubject.subscribe(
  //  data => this.theObservable=Observable.of(data)
  //)
  constructor(private _SearchService: SearchService) {
    this.myControl = new FormControl();
  }

/*
  onKey(event: any){
    console.log(event.target.value);
    if (event.target !== undefined){
      this._SearchService.getAutoComplete(event.target.value.toLowerCase())
        .subscribe(
          data => this.options = this.responseToArray(data)
        )
    }
  }
*/
  getMatches(query){
    console.log(query);
    let matches: any[];
 
    this._SearchService.getAutoComplete(query.toLowerCase())
      .subscribe(
        data => {
          console.log('data is:', data);
          matches = this.responseToArray(data)
          
        }
      )

    return matches;
  }
  
  responseToArray(object) {
    let myArray = [];
    if(object.length > 0 && object !== undefined ){
      let limit = 5;
      if(object.length < 6){
        limit = object.length;
      }
      for(let i = 0; i < limit; i++){
        myArray.push(object[i].name);
      }
    }
    return myArray;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
         .map( data => { 
           console.log(this.getMatches(data));
           return this.getMatches(data);
          })
  }

}
