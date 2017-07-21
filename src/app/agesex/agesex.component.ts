import { Component, OnInit } from '@angular/core';
import { DiagnoseService } from '../diagnose.service';

@Component({
  selector: 'app-agesex',
  templateUrl: './agesex.component.html',
  styleUrls: ['./agesex.component.scss']
})
export class AgesexComponent implements OnInit {
  chosenSex: string = "";
  chosenAge: number = 0;

  constructor(private _DiagnoseService: DiagnoseService) { }

  inputUpdate() {
    this._DiagnoseService.updatePatientInfo(this.chosenAge, this.chosenSex);
    console.log(this.chosenAge, this.chosenSex);
  }

  ngOnInit() {
  }

}
