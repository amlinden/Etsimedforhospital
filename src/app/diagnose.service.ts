import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

//Object Typings
import { Symptom } from "./datatypes/symptom";
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

  constructor() { 
    this.currentStep = 0;
    this.currentStepSubject = new BehaviorSubject(this.currentStep);
    this.currentStepObservable = this.currentStepSubject.asObservable();

    this.patientSymptoms = [];
    this.symptomsSubject = new BehaviorSubject(this.patientSymptoms);
    this.symptomsObservable = this.symptomsSubject.asObservable();

    this.patientInfo = new PatientInfo(0, 'female');
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

  addSymptom(symptom: any){
    if(!this.exists(symptom).exist){
      this.patientSymptoms.push(symptom);
    }
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
