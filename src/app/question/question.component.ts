import { Component, OnInit, Input } from '@angular/core';
import { DiagnoseService } from "../diagnose.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() id: number;
  @Input() text: Array<any>;
  answer: number;
  currentAnswer: boolean;
  constructor(private _DiagnoseService: DiagnoseService) {
    //_DiagnoseService.answerSymptom(id, answer);
  }
  updateAnswer(){
    console.log(this.answer);
    if(this.answer === 1){
      this._DiagnoseService.answerSymptom(this.id, true);
      console.log("true");
    } else {
      this._DiagnoseService.answerSymptom(this.id, false);
      console.log("false");
    }
    console.log(this.id, this._DiagnoseService.getSymptoms());
  }
  ngOnInit() {
  }

}
