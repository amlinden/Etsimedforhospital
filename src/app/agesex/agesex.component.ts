import { Component, OnInit } from '@angular/core';
import { DiagnoseService } from '../diagnose.service';
import {FormControl, Validators} from '@angular/forms';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-agesex',
  templateUrl: './agesex.component.html',
  styleUrls: ['./agesex.component.scss']
})


export class AgesexComponent implements OnInit {
  selectedSex: string;

  sex= [
    'Male',
    'Female',
  ];
  

  chosenAge: number = 0;

  constructor(private _DiagnoseService: DiagnoseService) { }

    
  
  inputUpdate() {
    this._DiagnoseService.updatePatientInfo(this.chosenAge, this.selectedSex);
    console.log(this.chosenAge);
  }



  ngOnInit() {
  }

}




