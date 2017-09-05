import { Component, OnInit } from '@angular/core';
import { FormControl } from  '@angular/forms';
import { SearchService } from "../search.service";
import { Observable, Subject } from 'rxjs';
import { DiagnoseService } from '../diagnose.service';
import { TranslateService } from '../translate.service';
import { Symptom } from "../datatypes/symptom";

@Component({
	selector: 'app-symptoms',
	templateUrl: './symptoms.component.html',
	styleUrls: ['./symptoms.component.scss']
})

export class SymptomsComponent implements OnInit {
	private text: Object;
	//Selected Symptoms
	symptoms: Array<Symptom>;
	//Searched and selectable symptoms
	options: Array<Symptom>;
	symptomSearch: any;

	myControl: FormControl;
	error: boolean = false; 
	filteredOptions: Observable<object[]>;
	step;
  
	constructor(
		private _SearchService: SearchService, 
		private _DiagnoseService: DiagnoseService,
		private _TranslateService: TranslateService
	){
				
		this.myControl = new FormControl();
		this.symptoms = [];
		this.options = [];

		//Autocomplete search service observable
		this._SearchService.symptomSearch.subscribe( data => {
			this.options = data; 
			if(this.options.length > 5){this.options.splice(5)};
		});

		this._TranslateService.langObservable.subscribe( data => this.text = data );
		this._DiagnoseService.currentStepObservable.subscribe( data => this.step = data );
		this._DiagnoseService.symptomsObservable.subscribe( data => this.symptoms = data );
		
		this.myControl.valueChanges
		.subscribe( data => {
			if(data === null){data = ''};
			this._SearchService.getAutoComplete(data);
		});

	}
		
	addSymptom(symptom: Symptom){
		symptom.positive = true;
		this._DiagnoseService.addSymptom(symptom);
		this.myControl.reset();
		this.error = false;
	}

	compareInput(input){
		if (this.options !== undefined){
			if (this.options.length > 0){
				if (this.options[0].name === input ){
				console.log("it's the same");
				this.error = false;
				this._DiagnoseService.addSymptom(this.options[0]);
				}else{
				console.log('sorry, its an error');
				this.error = true;
				}
			} else {
				console.log('Also an error');
				this.error = true;
			}
		}
	}

	ngOnInit() {
	}

}
