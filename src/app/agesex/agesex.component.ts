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
  selectedSex: string;
  private text: Object;
  sex: Array<any> = [];
  chosenAge: number;

  constructor(
    private _DiagnoseService: DiagnoseService,
    private _TranslateService: TranslateService
  ) {
    this._TranslateService.langObservable.subscribe(
      data => this.text = data
      ); 
      console.log(this.selectedSex);
      this.sex=[this.text["agesex"].male, this.text["agesex"].female];
    }  
    
  inputUpdate() {
    this._DiagnoseService.updatePatientInfo(this.chosenAge, this.selectedSex);
    console.log(this.chosenAge);
    console.log(this.selectedSex);
  }



  ngOnInit() {
  }

}




