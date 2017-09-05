import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

//Object Typings
import { Symptom, Symptoms } from "./datatypes/symptom";
import { PatientInfo } from "./datatypes/patientInfo";

@Injectable()
export class DiagnoseService {

  private patientInfo: PatientInfo;
  private patientSymptoms: Array<Symptom>;
  private currentStep: number;
  
  private currentStepSubject: BehaviorSubject<number>;
  public currentStepObservable: Observable<number>;

  private symptomsSubject: BehaviorSubject<Array<Symptom>>;
  public symptomsObservable: Observable<Array<Symptom>>;
  public currentUuid;
  constructor() {
    this.currentUuid = UUID.UUID();
    this.currentStep = 0;
    this.currentStepSubject = new BehaviorSubject(this.currentStep);
    this.currentStepObservable = this.currentStepSubject.asObservable();

    //Selected symptoms
    this.patientSymptoms = [];

    //
    this.symptomsSubject = new BehaviorSubject(this.patientSymptoms);
    this.symptomsObservable = this.symptomsSubject.asObservable();

    this.patientInfo = new PatientInfo(0, 'female');
  }

  answerSymptom(id, answer: boolean){
    for(let i=0; i < this.patientSymptoms.length; i++){
      if(this.patientSymptoms[i].id === id){

        this.patientSymptoms[i].positive = answer;

      }
    }
  }

  nextStep(){
    this.currentStep += 1;
    this.currentStepSubject.next(this.currentStep);
  }

  previousStep(){
    this.currentStep -= 1;
    this.currentStepSubject.next(this.currentStep);
  }

  updatePatientInfo(age, sex){
    this.patientInfo.age = age;
    this.patientInfo.sex = sex;
  }

  getPatientInfo(){
    return this.patientInfo;
  }
  addSymptoms(symptoms){
    for(let i=0; i < symptoms.length; i++){
      this.addSymptom(symptoms[i]);
    }
  }
  addSymptom(symptom: any){
    if(!this.exists(symptom).exist){
      this.patientSymptoms.push(symptom);
      console.log("ADDED", symptom.id);
    }
    console.log("NOT ADDED BOO");
    this.symptomsSubject.next(this.patientSymptoms);
  }

  removeSymptom(symptom){
    let existance = this.exists(symptom);
    if(existance.exist){
      this.patientSymptoms.splice(existance.pos, 1);
    }
    this.symptomsSubject.next(this.patientSymptoms);
  }

  getSymptoms(){
    return this.patientSymptoms;
  }

  //This method expects id's to be unique.
  private exists(symptom){

    let existance = {
      exist: false,
      pos: -1
    };

    for(let i = 0; i < this.patientSymptoms.length; i++){
      if(this.patientSymptoms[i].id === symptom.id){
        existance.exist = true;
        existance.pos = i;
      }
    }
    return existance;
  }
}
