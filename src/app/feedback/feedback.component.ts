import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
 selectedAccuracy: string;

  yesno = [
    'Yes',
    'No',
  ];

  selectedTreatment: string;

  treatments = [
    'No treatment',
    'Nurse',
    'Nurse for occupational health',
    'Doctor',
  ];
  constructor() { }

  ngOnInit() {
  }

}


