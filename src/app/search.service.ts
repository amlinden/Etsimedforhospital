import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';
import { Symptom, Symptoms } from "./datatypes/symptom";

@Injectable()
export class SearchService {
    //TODO?
    private token: string;
    //Symptoms
    private symptomSearchSubject: BehaviorSubject<any>;
    public symptomSearch: Observable<any>;

    private startSymptoms: Symptoms;
    private startSymptom: Symptom[];

    public currentSymptoms;
    public questions;
    public feedback;

    constructor(private http: Http){
        //?
        this.token = localStorage.getItem('token');
        
        //Observable logic for symptom searching
        this.startSymptom = [];
        //this.startSymptoms = new Symptoms(this.startSymptom);
        this.symptomSearchSubject = new BehaviorSubject(this.startSymptom);
        this.symptomSearch = this.symptomSearchSubject.asObservable();
        this.postSymptoms();
    }
    //Autocomplete:
    updateSubject(input){
        input.subscribe(data => this.symptomSearchSubject.next(data));
    }
    getAutoComplete(searchString){
        let apiUri: string = environment.apiURL;
        let sessionID = 0;

        // FORMAT: <URL>/symptoms/match?user_id=<user_id>&query=<query>
        let query = apiUri+'/symptoms/match?user_id='+sessionID+'&query='+searchString; 
        if(searchString.length > 0){
            this.updateSubject(this.http
                .get(query)
                .map(r => r.json() as Symptoms)); //Map and Match internal data type
        } else {
            this.symptomSearchSubject.next([]);
        }
        
    }
    //Send Symptoms get questions
    postSymptoms(symptoms?){
        let apiUri: string = environment.apiURL;
        let sessionID = 0;
        ///symptoms/predict/{"symptoms": [<symptom>,{}], "user_id": 123, "limit": 15}
        
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            symptoms
            ,
            "user_id": 0,
            "limit": 5
        });
        let url = apiUri+'/symptoms/predict';

        return this.http.post(url, body, options)
                        .map(response => response.json()); 
    }
    getDiagInfo(diagnoseId){
        let apiUri: string = environment.apiURL;
        let sessionID = 0;
        let url = apiUri+'/diagnosis/'+diagnoseId+'?user_id='+sessionID
        return this.http.get(url)
                        .map(response => response.json());
    }
    getDiagnoses(symptoms: Array<Symptom>){
        let apiUri: string = environment.apiURL;
        let sessionID = 0;
        ///symptoms/predict/{"symptoms": [<symptom>,{}], "user_id": 123, "limit": 15}
        
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "symptoms": symptoms,
            "user_id": 0,
            "limit": 10
        });
        let url = apiUri+'/diagnoses/rank'; //{"symptoms": '+symptoms+'],"user_id"'+sessionID+''
        //Observable<Response> ob = 
        return this.http.post(url, body, options)
                        .map(response => response.json());
    }
    postFeedback(feedback){
        let apiUri: string = environment.apiURL;
        let sessionID = 0;
        ///symptoms/predict/{"symptoms": [<symptom>,{}], "user_id": 123, "limit": 15}
        
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            "feedback": {
                "correctDiagnosis": true,
                "nextStep": "Doctor",
                "selfReportedSickLeave": false,
                "comments": ""
            },
            "user_id": 0
        })
        let url = apiUri+'/feedback/'; //{"symptoms": '+symptoms+'],"user_id"'+sessionID+''
        //Observable<Response> ob = 
        this.http
        .post(url, body, options)
            .map(response => response.json())
            .subscribe(res => console.log(res)); 
    }

    /*
    [
  {
    "id": 86, 
    "name": "Depressive or psychotic symptoms", 
    "score": 2.225785305148877
  }, 
  {
    "id": 462, 
    "name": "Weakness", 
    "score": 2.184833734047579
  }, 
  {
    "id": 361, 
    "name": "Seizures", 
    "score": 1.8815484146546813
  }
  ...
]
    */
  login(){
    var username = "etsimohc";
    var password = "mvp";

    let headers = new Headers();
    headers.append('Authorization', "Basic " + btoa('etsimohc' + ":" + 'mvp'));
    //headers.append("Content-Type", "application/x-www-form-urlencoded");

    let apiUri = 'http://13.69.154.190/medical/mvp/api.php';
    return this.http
                .get(apiUri, {headers: headers})
                //.map(r => r.json() as Object)
                //.subscribe((data : any) => console.log(data));
  }
}

        ////Service authentication
        //var username = "etsimohc";
        //var password = "mvp";
        //let headers = new Headers();
        //let options = new RequestOptions( {headers: headers});
        //headers.append("Authorization", "Basic ZXRzaW1vaGM6bXZw");
        //headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        //headers.append("Content-Type", "text/html; charset=iso-8859-1");
        //let options: RequestOptions = new RequestOptions({headers: headers});
        //headers.append("Content-Type", "application/x-www-form-urlencoded");
        //let options = new RequestOptions({ headers: headers });