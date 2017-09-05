import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  selectedSickleave: string;
  private text: Object;
  sickleave: Array <any>;

  constructor(private _TranslateService: TranslateService) { this._TranslateService.langObservable.subscribe(
      data => this.text = data
      ); 
      this.sickleave = [this.text["questions"].yes, this.text["questions"].no];
    }

  ngOnInit() {
  }

}
