import { Component, OnInit } from '@angular/core';
import { DiagnoseService } from '../diagnose.service';
import {FormControl, Validators} from '@angular/forms';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {
  private text: Object;
  step: number;
  te:string;
  showButtons: boolean;
  prevIsDisabled: boolean;
  nextIsDisabled: boolean;

  //Titles:
  //titles = [];

  constructor(
    private _DiagnoseService:DiagnoseService,
    private _TranslateService: TranslateService
  ) {
    this._DiagnoseService.currentStepObservable.subscribe( r =>  {
      this.step = r;
      this.enableDisableButtons();

     this._TranslateService.langObservable.subscribe(
      data => this.text = data
      ); 

      
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
  //   this.titles[0] = "New diagnose"; //0
  //   this.titles[1] = "Patient information"; //1
  //   this.titles[2] = "Symptoms"; //2
  //   this.titles[3] = "Follow-up questions"; //3
  //   this.titles[4] = "Result"; //4
  //   this.titles[5] = "Feedback"; //5
  }

}
