import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { SearchService } from "../search.service";
import { DiagnoseService } from "../diagnose.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  private text: Object;
  yesNoQuestion: Array<any>;
  questions: Array<any>;
  
  constructor(
    private _TranslateService: TranslateService,
    private _SearchService: SearchService,
    private _DiagnoseService: DiagnoseService
  ){ 
    this.questions = [];
    this._SearchService.postSymptoms( _DiagnoseService.getSymptoms() )
      .subscribe( res => {
        this.questions = res;
        //Setting all answers to false
        for(let i=0; i < this.questions.length; i++){
          this.questions[i].positive = false; 
        }
        //Adding symptoms to diagnosis
        this._DiagnoseService.addSymptoms(this.questions);
      }
    );


    this._TranslateService.langObservable.subscribe( data => this.text = data); 
    this.yesNoQuestion = [this.text["questions"].yes, this.text["questions"].no];
  }
  ngOnInit() {
  }

}
