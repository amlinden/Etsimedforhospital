import { Component, OnInit } from '@angular/core';
import { DiagnoseService } from '../diagnose.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {

  step: number;
  showButtons: boolean;
  prevIsDisabled: boolean;
  nextIsDisabled: boolean;

  //Titles:
  titles: Array<String>;

  constructor(private _DiagnoseService:DiagnoseService) {
     /*
      this.titles.push("New Diagnose"); //0
      this.titles.push("Age & Sex"); //1
      this.titles.push("Symptoms"); //2
      this.titles.push("Follow up questions"); //3
      this.titles.push(""); //4
      this.titles.push(""); //5
      */
    this._DiagnoseService.currentStepObservable.subscribe( r =>  {
      this.step = r;
      this.enableDisableButtons();
      console.log(this.step);
    });

  }

  enableDisableButtons(){
    if(this.step === 0){
        this.prevIsDisabled = true;
        this.nextIsDisabled = false;
    }else if(this.step === 5){
      this.prevIsDisabled = false;
      this.nextIsDisabled = true;
    }else{
      this.prevIsDisabled = false;
      this.nextIsDisabled = false;
    }
    if(this.step > 0 && this.step < 6){
      this.showButtons = true;
    } else {
      this.showButtons = false;
    }
  }

  checkStep(){

  }
  ngOnInit() {
  }

}
