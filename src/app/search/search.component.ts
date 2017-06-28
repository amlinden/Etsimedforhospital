import { Component, OnInit } from '@angular/core';
import { SearchService } from "../search.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
symptom: string;
  constructor(private _SearchService: SearchService) { }

  ngOnInit() {
    this._SearchService.getAutoComplete('loss').subscribe(data => {
      console.log('Hello!', data);
    })
  }

}
