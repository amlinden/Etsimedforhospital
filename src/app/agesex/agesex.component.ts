import { Component, OnInit } from '@angular/core';
import { DiagnoseService } from '../diagnose.service';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService } from '../translate.service';

@Component({
  selector: 'app-agesex',
  templateUrl: './agesex.component.html',
  styleUrls: ['./agesex.component.scss']
})


export class AgesexComponent implements OnInit {
  selectedSex:string;
  private text: Object;
  sex: Array<object> = [];
  chosenAge: number;

  constructor(
    private _DiagnoseService: DiagnoseService,
    private _TranslateService: TranslateService
  ) {
    this._TranslateService.langObservable
      .subscribe( data => this.text = data );

    this.sex = [{
      "text" : this.text["agesex"].male,
      "value" : 1
    },{
      "text" : this.text["agesex"].female,
      "value" : 0
    }
    ];
    console.log();
  }    

  onSelectionChange(entry){
    this.selectedSex =  entry;
    console.log(this.selectedSex);  
  }

    inputUpdate() {
      this._DiagnoseService.updatePatientInfo(this.chosenAge, this.selectedSex);
      
  }
  ngOnInit() {
    this._TranslateService.langObservable
		  .subscribe( data => {if(data !== undefined){this.text = data}} ); 

}

}


