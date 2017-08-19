import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class SearchService {
  token: string;
  constructor( private http: Http){
    this.token = localStorage.getItem('token')
   }
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

  /*getAutoComplete(query): Observable<JSON>{
    var username = "etsimohc";
    var password = "mvp";

    let headers = new Headers();
    //let options = new RequestOptions( {headers: headers});
    //headers.append("Authorization", "Basic ZXRzaW1vaGM6bXZw");
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append("Content-Type", "text/html; charset=iso-8859-1");
    let options: RequestOptions = new RequestOptions({headers: headers});
    //headers.append("Content-Type", "application/x-www-form-urlencoded");
    //let options = new RequestOptions({ headers: headers });

    let apiUri = 'http://13.69.154.190/medical/mvp/api.php';
    console.log(headers, options);
    return this.http
                .get(apiUri, options)
                .map(r => r.json() as Object);
  }
  */
  getAutoComplete(query): Observable<any>{

    let db = this.data.symptoms;

    if (query === '' || query === null){
      var re = new RegExp(query);
    }else{
      var re = new RegExp(query);
    }
    
    var list = [];
    for (let i = 0; i < db.length; i++){
      if (re.test(db[i].name.toLowerCase())){
        list.push(db[i]);
      }
    }
    return Observable.of(list);
  }

/*
import 'rxjs/Rx';
import { navEntries } from '../dataTypes/navData';
import { solutionData } from '../dataTypes/solutionData';
import { QueryParams } from '../dataTypes/queryParams';
*/
/*
@Injectable()
export class ContentService {
  constructor(
    private http: Http
  ) { }

  private queryParamsSubject = new Subject<QueryParams>();
  public queryParamsObservable = this.queryParamsSubject.asObservable();
  private storedQueryParams:QueryParams;
  
  setQueryParams(qp: QueryParams){
    this.storedQueryParams = qp;
    this.queryParamsSubject.next(qp);
  }

  refreshPreviousQuery(){
    if(this.storedQueryParams != undefined){
      this.queryParamsSubject.next(this.storedQueryParams);
    }
  }

  //Gets the "navigation" for troublshooting from content engine mi. in AWS through http request
  getNavigation(params): Observable<navEntries[]> {
    //Request headers
    const headers = new Headers();
    headers.append('x-guid', params.env['x-guid']);
    headers.append('x-channel-name', 'contentWatch');
    //Build query from params in Firebase db
    let queryString:string = `navigation?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"],"os":["${params.os}"]},"params":{"page":0}}`;
    //Return as observable and map response on "navEntries" datatype, defined at components/datatypes/.
    return this.http
      .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
      .map((r: Response) => r.json().data as navEntries[]);
  }

  getUsageTips(params, selectedCategories, page): Observable<Object> {
      const headers = new Headers();
      headers.append('x-guid', params.env['x-guid']);
      headers.append('x-channel-name', 'contentWatch');

      let categoryString = "";
      let numCategories = 0; 
      let categories = [];

      //If a category has been selected, use that, else use all categories in databse (from firebase)
      if(selectedCategories.length > 0){
        numCategories = selectedCategories.length; 
        categories = selectedCategories;
      } else {
        numCategories = params.usagetipsCategories.length; 
        categories = params.usagetipsCategories;
      }

      //debugging
      console.log("Params in getUsageTips contentService", params);
      console.log("numCategories", numCategories);
      console.log("selected categories", selectedCategories);

      //Build the search string for the categories
      for(let i = 0; i < numCategories; i++){
        categoryString += '"'+categories[i]+'"';
        if(i < numCategories-1){
          categoryString += ", ";
        }
      }

      //reminder: category is called 'collection' in usagetips
      let queryString:string = `tips?query={"tags":{"tenant":["${params.tenant}"],"lang":["${params.lang}"],"category":["${params.category}"],"model":["${params.model}"], "os": [${params.os}],"collection": [${categoryString}]},"params":{"page":${page}}}`;
      return this.http
                  .get(params.env['ce']+'v2/contentengine/'+queryString, {headers: headers})
                  .map((r: Response) => {
                    let data = r.json().data;
                    let numPages = r.json().totalPage;
                    let currentPage = r.json().currentPage;
                    return {
                      "data": data, 
                      "pages": numPages, 
                      "currentPage": currentPage,
                      "categories": categories};
                  });
  }

  //gets the solution lists with html links for troubleshootung, see getNavigation() comments for usage.
  getSolutions(problemID: string, previousQueryParams: QueryParams): Observable<solutionData>{
    let queryType:string = "solutions/";
    const headers = new Headers();
    headers.append('x-guid', 'halebop#eu-west-1:8138c478-b446-4566-b7e1-b4507c05ecf1');
    headers.append('x-channel-name', 'contentWatch');
    
    return this.http
                .get(previousQueryParams.env['ce']+'v2/contentengine/'+queryType+problemID, {headers: headers})
                .map((r: Response) => r.json().data as solutionData);
  }
  //fetches the individual html solutions from S3
  getSolutionHTML(uri: string): Observable<string>{
    return this.http
                .get(uri)
                .map((r: Response) => r.text() as string);
  }
}
*/

data = {
    "symptoms": [
        {
            "id": "1",
            "name": "Abdominal distention"
        },
        {
            "id": "2",
            "name": "Abdominal pain"
        },
        {
            "id": "3",
            "name": "Abnormal appearing skin"
        },
        {
            "id": "4",
            "name": "Abnormal appearing tongue"
        },
        {
            "id": "5",
            "name": "Abnormal appetite"
        },
        {
            "id": "6",
            "name": "Abnormal body temperature"
        },
        {
            "id": "7",
            "name": "Abnormal breathing sounds"
        },
        {
            "id": "8",
            "name": "Abnormal color of lips"
        },
        {
            "id": "9",
            "name": "Abnormal eye appearance"
        },
        {
            "id": "514",
            "name": "Abnormal gait"
        },
        {
            "id": "10",
            "name": "Abnormal growth or development"
        },
        {
            "id": "11",
            "name": "Abnormal involuntary movements"
        },
        {
            "id": "12",
            "name": "Abnormal movement of eyelid"
        },
        {
            "id": "515",
            "name": "Abnormal muscle enlargement"
        },
        {
            "id": "13",
            "name": "Abnormal pulse"
        },
        {
            "id": "14",
            "name": "Abnormal size or shape of ear"
        },
        {
            "id": "15",
            "name": "Abnormal sputum"
        },
        {
            "id": "16",
            "name": "Abnormal urine"
        },
        {
            "id": "516",
            "name": "Abnormally round face"
        },
        {
            "id": "17",
            "name": "Absence of menstruation"
        },
        {
            "id": "18",
            "name": "Abusing alcohol"
        },
        {
            "id": "19",
            "name": "Ache all over"
        },
        {
            "id": "20",
            "name": "Acne or pimples"
        },
        {
            "id": "517",
            "name": "Agitation"
        },
        {
            "id": "21",
            "name": "Allergic reaction"
        },
        {
            "id": "22",
            "name": "Ankle cramps or spasms"
        },
        {
            "id": "23",
            "name": "Ankle lump or mass"
        },
        {
            "id": "24",
            "name": "Ankle pain"
        },
        {
            "id": "25",
            "name": "Ankle stiffness or tightness"
        },
        {
            "id": "26",
            "name": "Ankle swelling"
        },
        {
            "id": "27",
            "name": "Ankle symptoms"
        },
        {
            "id": "28",
            "name": "Ankle weakness"
        },
        {
            "id": "29",
            "name": "Antisocial behavior"
        },
        {
            "id": "518",
            "name": "Anxiety"
        },
        {
            "id": "30",
            "name": "Anxiety and nervousness"
        },
        {
            "id": "519",
            "name": "Apathy"
        },
        {
            "id": "31",
            "name": "Apnea"
        },
        {
            "id": "32",
            "name": "Apraxia"
        },
        {
            "id": "33",
            "name": "Arm cramps or spasms"
        },
        {
            "id": "34",
            "name": "Arm lump or mass"
        },
        {
            "id": "35",
            "name": "Arm pain"
        },
        {
            "id": "36",
            "name": "Arm stiffness or tightness"
        },
        {
            "id": "37",
            "name": "Arm swelling"
        },
        {
            "id": "38",
            "name": "Arm symptoms"
        },
        {
            "id": "39",
            "name": "Arm weakness"
        },
        {
            "id": "40",
            "name": "Back cramps or spasms"
        },
        {
            "id": "41",
            "name": "Back mass or lump"
        },
        {
            "id": "42",
            "name": "Back pain"
        },
        {
            "id": "43",
            "name": "Back stiffness or tightness"
        },
        {
            "id": "44",
            "name": "Back swelling"
        },
        {
            "id": "45",
            "name": "Back symptoms"
        },
        {
            "id": "46",
            "name": "Back weakness"
        },
        {
            "id": "520",
            "name": "Bad breath"
        },
        {
            "id": "521",
            "name": "Bad taste in mouth"
        },
        {
            "id": "522",
            "name": "Bald spots"
        },
        {
            "id": "47",
            "name": "Bedwetting"
        },
        {
            "id": "48",
            "name": "Behavioral disturbances"
        },
        {
            "id": "523",
            "name": "Belching"
        },
        {
            "id": "524",
            "name": "Binge drinking"
        },
        {
            "id": "525",
            "name": "Binge eating"
        },
        {
            "id": "526",
            "name": "Bitter almond odor on breath"
        },
        {
            "id": "528",
            "name": "Black colored skin"
        },
        {
            "id": "527",
            "name": "Black colored stools"
        },
        {
            "id": "529",
            "name": "Blackouts"
        },
        {
            "id": "49",
            "name": "Bladder mass"
        },
        {
            "id": "50",
            "name": "Bladder symptoms"
        },
        {
            "id": "530",
            "name": "Blank stare"
        },
        {
            "id": "531",
            "name": "Bleeding"
        },
        {
            "id": "51",
            "name": "Bleeding from ear"
        },
        {
            "id": "52",
            "name": "Bleeding from eye"
        },
        {
            "id": "532",
            "name": "Bleeding from nipple"
        },
        {
            "id": "53",
            "name": "Bleeding gums"
        },
        {
            "id": "533",
            "name": "Bleeding in eye"
        },
        {
            "id": "54",
            "name": "Bleeding in mouth"
        },
        {
            "id": "55",
            "name": "Bleeding or discharge from nipple"
        },
        {
            "id": "56",
            "name": "Bleeding skin mole"
        },
        {
            "id": "534",
            "name": "Blind spot in vision"
        },
        {
            "id": "57",
            "name": "Blindness"
        },
        {
            "id": "535",
            "name": "Blinking eyes"
        },
        {
            "id": "536",
            "name": "Bloating or fullness"
        },
        {
            "id": "58",
            "name": "Blood clots during menstrual periods"
        },
        {
            "id": "59",
            "name": "Blood in stool"
        },
        {
            "id": "537",
            "name": "Blood in toilet"
        },
        {
            "id": "60",
            "name": "Blood in urine"
        },
        {
            "id": "538",
            "name": "Blood on stool surface"
        },
        {
            "id": "539",
            "name": "Blood on toilet tissue"
        },
        {
            "id": "540",
            "name": "Blood or red colored urine"
        },
        {
            "id": "512",
            "name": "Bloody diarrhea"
        },
        {
            "id": "541",
            "name": "Bloody or red colored stools"
        },
        {
            "id": "542",
            "name": "Bloody or red colored vomit"
        },
        {
            "id": "543",
            "name": "Blue colored skin"
        },
        {
            "id": "544",
            "name": "Blue coloured lips"
        },
        {
            "id": "545",
            "name": "Blurred vision"
        },
        {
            "id": "546",
            "name": "Body aches or pains"
        },
        {
            "id": "61",
            "name": "Bones are painful"
        },
        {
            "id": "62",
            "name": "Bowlegged or knock-kneed"
        },
        {
            "id": "63",
            "name": "Breathing fast"
        },
        {
            "id": "64",
            "name": "Breathing problems"
        },
        {
            "id": "547",
            "name": "Brittle hair"
        },
        {
            "id": "548",
            "name": "Broken bone"
        },
        {
            "id": "549",
            "name": "Broken bones"
        },
        {
            "id": "550",
            "name": "Bruising or discoloration"
        },
        {
            "id": "551",
            "name": "Bulging eyes"
        },
        {
            "id": "552",
            "name": "Bulging neck veins"
        },
        {
            "id": "553",
            "name": "Bulging veins"
        },
        {
            "id": "65",
            "name": "Bumps on penis"
        },
        {
            "id": "66",
            "name": "Burning abdominal pain"
        },
        {
            "id": "67",
            "name": "Burning chest pain"
        },
        {
            "id": "554",
            "name": "Change in bowel habits"
        },
        {
            "id": "555",
            "name": "Change in hair texture"
        },
        {
            "id": "68",
            "name": "Change in skin mole size or color"
        },
        {
            "id": "556",
            "name": "Change in stools"
        },
        {
            "id": "557",
            "name": "Change in vision"
        },
        {
            "id": "69",
            "name": "Changes in bowel function"
        },
        {
            "id": "70",
            "name": "Changes in stool appearance"
        },
        {
            "id": "71",
            "name": "Chest pain"
        },
        {
            "id": "72",
            "name": "Chest tightness"
        },
        {
            "id": "73",
            "name": "Chills"
        },
        {
            "id": "558",
            "name": "Choking"
        },
        {
            "id": "559",
            "name": "Choking on food"
        },
        {
            "id": "560",
            "name": "Clicking or popping sound from jaw"
        },
        {
            "id": "74",
            "name": "Cloudy eye"
        },
        {
            "id": "561",
            "name": "Cloudy urine with strong odor"
        },
        {
            "id": "562",
            "name": "Cloudy vision"
        },
        {
            "id": "563",
            "name": "Coarse hair"
        },
        {
            "id": "564",
            "name": "Coated or furry tongue"
        },
        {
            "id": "565",
            "name": "Coffee grounds colored vomit"
        },
        {
            "id": "566",
            "name": "Cold feet"
        },
        {
            "id": "567",
            "name": "Cold hands"
        },
        {
            "id": "568",
            "name": "Color change"
        },
        {
            "id": "569",
            "name": "Coma"
        },
        {
            "id": "570",
            "name": "Compulsive behavior"
        },
        {
            "id": "571",
            "name": "Confusion"
        },
        {
            "id": "75",
            "name": "Congestion in chest"
        },
        {
            "id": "76",
            "name": "Constipation"
        },
        {
            "id": "77",
            "name": "Coryza"
        },
        {
            "id": "78",
            "name": "Cough"
        },
        {
            "id": "79",
            "name": "Coughing up sputum"
        },
        {
            "id": "572",
            "name": "Cracks at corner of mouth"
        },
        {
            "id": "80",
            "name": "Cramps and spasms"
        },
        {
            "id": "573",
            "name": "Craving alcohol"
        },
        {
            "id": "574",
            "name": "Craving to eat ice, dirt or paper"
        },
        {
            "id": "81",
            "name": "Cross-eyed"
        },
        {
            "id": "575",
            "name": "Crying during sleep"
        },
        {
            "id": "576",
            "name": "Curved fingernails"
        },
        {
            "id": "577",
            "name": "Curved or bent penis during erection"
        },
        {
            "id": "578",
            "name": "Curved spine"
        },
        {
            "id": "579",
            "name": "Damaged teeth enamel"
        },
        {
            "id": "580",
            "name": "Dark colored urine"
        },
        {
            "id": "82",
            "name": "Decreased appetite"
        },
        {
            "id": "83",
            "name": "Decreased heart rate"
        },
        {
            "id": "581",
            "name": "Decreased night vision"
        },
        {
            "id": "582",
            "name": "Decreased school performance"
        },
        {
            "id": "583",
            "name": "Decreased smell"
        },
        {
            "id": "584",
            "name": "Decreased sweating"
        },
        {
            "id": "585",
            "name": "Decreased taste"
        },
        {
            "id": "586",
            "name": "Decreased tears when crying"
        },
        {
            "id": "587",
            "name": "Decreased urination"
        },
        {
            "id": "588",
            "name": "Delayed language skills"
        },
        {
            "id": "589",
            "name": "Delayed motor development"
        },
        {
            "id": "590",
            "name": "Delusions"
        },
        {
            "id": "84",
            "name": "Delusions or hallucinations"
        },
        {
            "id": "591",
            "name": "Depressed mood"
        },
        {
            "id": "85",
            "name": "Depression"
        },
        {
            "id": "86",
            "name": "Depressive or psychotic symptoms"
        },
        {
            "id": "592",
            "name": "Developmental delays"
        },
        {
            "id": "87",
            "name": "Diaper rash"
        },
        {
            "id": "88",
            "name": "Diarrhea"
        },
        {
            "id": "593",
            "name": "Difficult to wake from sleep"
        },
        {
            "id": "89",
            "name": "Difficulty breathing"
        },
        {
            "id": "594",
            "name": "Difficulty breathing through nose"
        },
        {
            "id": "595",
            "name": "Difficulty concentrating"
        },
        {
            "id": "90",
            "name": "Difficulty eating"
        },
        {
            "id": "596",
            "name": "Difficulty falling asleep"
        },
        {
            "id": "597",
            "name": "Difficulty finding words"
        },
        {
            "id": "91",
            "name": "Difficulty in swallowing"
        },
        {
            "id": "598",
            "name": "Difficulty learning new things"
        },
        {
            "id": "599",
            "name": "Difficulty moving arm"
        },
        {
            "id": "600",
            "name": "Difficulty opening mouth"
        },
        {
            "id": "601",
            "name": "Difficulty relaxing muscles after contracting them"
        },
        {
            "id": "602",
            "name": "Difficulty sleeping"
        },
        {
            "id": "603",
            "name": "Difficulty solving problems"
        },
        {
            "id": "92",
            "name": "Difficulty speaking"
        },
        {
            "id": "604",
            "name": "Difficulty standing"
        },
        {
            "id": "605",
            "name": "Difficulty starting urine stream"
        },
        {
            "id": "606",
            "name": "Difficulty staying asleep"
        },
        {
            "id": "607",
            "name": "Difficulty staying awake during day"
        },
        {
            "id": "608",
            "name": "Difficulty stopping urine stream"
        },
        {
            "id": "609",
            "name": "Difficulty swallowing"
        },
        {
            "id": "610",
            "name": "Difficulty talking"
        },
        {
            "id": "611",
            "name": "Difficulty urinating"
        },
        {
            "id": "93",
            "name": "Diminished hearing"
        },
        {
            "id": "94",
            "name": "Diminished vision"
        },
        {
            "id": "612",
            "name": "Discharge from nipple"
        },
        {
            "id": "613",
            "name": "Discharge from penis"
        },
        {
            "id": "95",
            "name": "Discharge in stools"
        },
        {
            "id": "614",
            "name": "Discharge or mucus in eyes"
        },
        {
            "id": "615",
            "name": "Dislikes change in daily routine"
        },
        {
            "id": "616",
            "name": "Disorientation"
        },
        {
            "id": "617",
            "name": "Distended stomach"
        },
        {
            "id": "618",
            "name": "Distorted body image"
        },
        {
            "id": "619",
            "name": "Distortion of part of visual field"
        },
        {
            "id": "96",
            "name": "Disturbance of memory"
        },
        {
            "id": "97",
            "name": "Disturbance of smell or taste"
        },
        {
            "id": "98",
            "name": "Dizziness"
        },
        {
            "id": "99",
            "name": "Double vision"
        },
        {
            "id": "100",
            "name": "Drainage in throat"
        },
        {
            "id": "620",
            "name": "Drainage or pus"
        },
        {
            "id": "621",
            "name": "Drinking excessive fluids"
        },
        {
            "id": "622",
            "name": "Drooling"
        },
        {
            "id": "623",
            "name": "Drooping eyelid"
        },
        {
            "id": "624",
            "name": "Drooping of one side of face"
        },
        {
            "id": "625",
            "name": "Drowsiness"
        },
        {
            "id": "101",
            "name": "Drug abuse"
        },
        {
            "id": "626",
            "name": "Dry eyes"
        },
        {
            "id": "102",
            "name": "Dry lips"
        },
        {
            "id": "627",
            "name": "Dry mouth"
        },
        {
            "id": "103",
            "name": "Dry or flaky scalp"
        },
        {
            "id": "628",
            "name": "Dry skin"
        },
        {
            "id": "104",
            "name": "Dyslexia"
        },
        {
            "id": "629",
            "name": "Ear ache"
        },
        {
            "id": "106",
            "name": "Ear pain"
        },
        {
            "id": "107",
            "name": "Ear symptoms"
        },
        {
            "id": "630",
            "name": "Early breast development"
        },
        {
            "id": "631",
            "name": "Early morning waking"
        },
        {
            "id": "105",
            "name": "Early or late onset of menopause"
        },
        {
            "id": "632",
            "name": "Easily distracted"
        },
        {
            "id": "633",
            "name": "Easy bleeding"
        },
        {
            "id": "634",
            "name": "Easy bruising"
        },
        {
            "id": "108",
            "name": "Elbow cramps or spasms"
        },
        {
            "id": "109",
            "name": "Elbow lump or mass"
        },
        {
            "id": "110",
            "name": "Elbow pain"
        },
        {
            "id": "111",
            "name": "Elbow stiffness or tightness"
        },
        {
            "id": "112",
            "name": "Elbow swelling"
        },
        {
            "id": "113",
            "name": "Elbow symptoms"
        },
        {
            "id": "114",
            "name": "Elbow weakness"
        },
        {
            "id": "635",
            "name": "Emotional detachment"
        },
        {
            "id": "115",
            "name": "Emotional symptoms"
        },
        {
            "id": "638",
            "name": "Enlarged finger tips"
        },
        {
            "id": "639",
            "name": "Enlarged or swollen glands"
        },
        {
            "id": "116",
            "name": "Enlarged prostate"
        },
        {
            "id": "636",
            "name": "Enlarged pupils"
        },
        {
            "id": "637",
            "name": "Enlarged veins"
        },
        {
            "id": "640",
            "name": "Episodes of not breathing during sleep"
        },
        {
            "id": "641",
            "name": "Erectile dysfunction"
        },
        {
            "id": "117",
            "name": "Excessive anger"
        },
        {
            "id": "118",
            "name": "Excessive appetite"
        },
        {
            "id": "642",
            "name": "Excessive body hair growth"
        },
        {
            "id": "643",
            "name": "Excessive crying"
        },
        {
            "id": "644",
            "name": "Excessive exercising"
        },
        {
            "id": "645",
            "name": "Excessive facial hair growth"
        },
        {
            "id": "119",
            "name": "Excessive growth"
        },
        {
            "id": "120",
            "name": "Excessive masturbation"
        },
        {
            "id": "646",
            "name": "Excessive mouth watering"
        },
        {
            "id": "647",
            "name": "Excessive sweating"
        },
        {
            "id": "121",
            "name": "Excessive urination at night"
        },
        {
            "id": "648",
            "name": "Excessively salty sweat or skin"
        },
        {
            "id": "122",
            "name": "Eye burns or stings"
        },
        {
            "id": "649",
            "name": "Eye crusting with sleep"
        },
        {
            "id": "123",
            "name": "Eye deviation"
        },
        {
            "id": "124",
            "name": "Eye discharge"
        },
        {
            "id": "650",
            "name": "Eye irritation"
        },
        {
            "id": "128",
            "name": "Eye moves abnormally"
        },
        {
            "id": "129",
            "name": "Eye protrusion"
        },
        {
            "id": "130",
            "name": "Eye redness"
        },
        {
            "id": "131",
            "name": "Eye strain"
        },
        {
            "id": "132",
            "name": "Eye symptoms"
        },
        {
            "id": "651",
            "name": "Eyelashes falling out"
        },
        {
            "id": "125",
            "name": "Eyelid lesion or rash"
        },
        {
            "id": "652",
            "name": "Eyelid redness"
        },
        {
            "id": "126",
            "name": "Eyelid retracted"
        },
        {
            "id": "127",
            "name": "Eyelid swelling"
        },
        {
            "id": "653",
            "name": "Eyes do not track together"
        },
        {
            "id": "654",
            "name": "Eyes rolling back"
        },
        {
            "id": "133",
            "name": "Facial pain"
        },
        {
            "id": "134",
            "name": "Fainting"
        },
        {
            "id": "135",
            "name": "Fatigue"
        },
        {
            "id": "655",
            "name": "Fear of air"
        },
        {
            "id": "656",
            "name": "Fear of gaining weight"
        },
        {
            "id": "657",
            "name": "Fear of water"
        },
        {
            "id": "658",
            "name": "Fearful"
        },
        {
            "id": "136",
            "name": "Fears and phobias"
        },
        {
            "id": "137",
            "name": "Feeling cold"
        },
        {
            "id": "659",
            "name": "Feeling faint"
        },
        {
            "id": "138",
            "name": "Feeling hot"
        },
        {
            "id": "139",
            "name": "Feeling hot and cold"
        },
        {
            "id": "140",
            "name": "Feeling ill"
        },
        {
            "id": "660",
            "name": "Feeling of being detached from reality"
        },
        {
            "id": "661",
            "name": "Feeling of not being able to get enough air"
        },
        {
            "id": "662",
            "name": "Feeling smothered"
        },
        {
            "id": "141",
            "name": "Feet turned in"
        },
        {
            "id": "142",
            "name": "Fever"
        },
        {
            "id": "663",
            "name": "Fits of rage"
        },
        {
            "id": "664",
            "name": "Flaking skin"
        },
        {
            "id": "665",
            "name": "Flashbacks"
        },
        {
            "id": "143",
            "name": "Flatulence"
        },
        {
            "id": "666",
            "name": "Flickering lights in vision"
        },
        {
            "id": "667",
            "name": "Flickering uncolored zig-zag line in vision"
        },
        {
            "id": "668",
            "name": "Floating spots or strings in vision"
        },
        {
            "id": "147",
            "name": "Flu-like syndrome"
        },
        {
            "id": "144",
            "name": "Fluid abnormality"
        },
        {
            "id": "145",
            "name": "Fluid in ear"
        },
        {
            "id": "146",
            "name": "Fluid retention"
        },
        {
            "id": "669",
            "name": "Flushed skin"
        },
        {
            "id": "148",
            "name": "Flushing"
        },
        {
            "id": "149",
            "name": "Focal weakness"
        },
        {
            "id": "670",
            "name": "Food cravings"
        },
        {
            "id": "671",
            "name": "Food getting stuck"
        },
        {
            "id": "150",
            "name": "Foot and toe symptoms"
        },
        {
            "id": "151",
            "name": "Foot or toe cramps or spasms"
        },
        {
            "id": "152",
            "name": "Foot or toe lump or mass"
        },
        {
            "id": "153",
            "name": "Foot or toe pain"
        },
        {
            "id": "154",
            "name": "Foot or toe stiffness or tightness"
        },
        {
            "id": "155",
            "name": "Foot or toe swelling"
        },
        {
            "id": "156",
            "name": "Foot or toe weakness"
        },
        {
            "id": "157",
            "name": "Foreign body sensation in eye"
        },
        {
            "id": "672",
            "name": "Forgetfulness"
        },
        {
            "id": "673",
            "name": "Foul smelling stools"
        },
        {
            "id": "674",
            "name": "Frequent bowel movements"
        },
        {
            "id": "675",
            "name": "Frequent changes in eye glass prescription"
        },
        {
            "id": "676",
            "name": "Frequent chewing"
        },
        {
            "id": "677",
            "name": "Frequent infections"
        },
        {
            "id": "678",
            "name": "Frequent laxative use"
        },
        {
            "id": "158",
            "name": "Frequent menstruation"
        },
        {
            "id": "679",
            "name": "Frequent nighttime urination"
        },
        {
            "id": "680",
            "name": "Frequent squinting"
        },
        {
            "id": "681",
            "name": "Frequent urge to have bowel movement"
        },
        {
            "id": "682",
            "name": "Frequent urge to urinate"
        },
        {
            "id": "159",
            "name": "Frequent urination"
        },
        {
            "id": "683",
            "name": "Frightening dreams"
        },
        {
            "id": "684",
            "name": "Frightening thoughts"
        },
        {
            "id": "160",
            "name": "Frontal headache"
        },
        {
            "id": "685",
            "name": "Fruity odor on breath"
        },
        {
            "id": "686",
            "name": "Gagging"
        },
        {
            "id": "161",
            "name": "Gastrointestinal symptoms"
        },
        {
            "id": "162",
            "name": "General symptoms"
        },
        {
            "id": "163",
            "name": "Genitourinary symptoms"
        },
        {
            "id": "687",
            "name": "Giddiness"
        },
        {
            "id": "688",
            "name": "Grinding teeth"
        },
        {
            "id": "689",
            "name": "Gritty or scratchy eyes"
        },
        {
            "id": "164",
            "name": "Groin mass"
        },
        {
            "id": "165",
            "name": "Groin pain"
        },
        {
            "id": "690",
            "name": "Grooved tongue"
        },
        {
            "id": "691",
            "name": "Guarding or favoring joint"
        },
        {
            "id": "166",
            "name": "Gum pain"
        },
        {
            "id": "692",
            "name": "Gum sores"
        },
        {
            "id": "693",
            "name": "Hair loss"
        },
        {
            "id": "694",
            "name": "Hallucinations"
        },
        {
            "id": "167",
            "name": "Hand and finger symptoms"
        },
        {
            "id": "168",
            "name": "Hand or finger cramps or spasms"
        },
        {
            "id": "169",
            "name": "Hand or finger lump or mass"
        },
        {
            "id": "170",
            "name": "Hand or finger pain"
        },
        {
            "id": "171",
            "name": "Hand or finger stiffness or tightness"
        },
        {
            "id": "172",
            "name": "Hand or finger swelling"
        },
        {
            "id": "173",
            "name": "Hand or finger weakness"
        },
        {
            "id": "174",
            "name": "Headache"
        },
        {
            "id": "175",
            "name": "Hearing dysfunction"
        },
        {
            "id": "695",
            "name": "Hearing loss"
        },
        {
            "id": "696",
            "name": "Hearing voices"
        },
        {
            "id": "176",
            "name": "Heart and vessel symptoms"
        },
        {
            "id": "177",
            "name": "Heartburn"
        },
        {
            "id": "697",
            "name": "Heavy menstrual bleeding"
        },
        {
            "id": "178",
            "name": "Heavy menstrual flow"
        },
        {
            "id": "179",
            "name": "Heightened hearing"
        },
        {
            "id": "180",
            "name": "Hemoptysis"
        },
        {
            "id": "181",
            "name": "Hesitancy"
        },
        {
            "id": "698",
            "name": "High blood pressure"
        },
        {
            "id": "182",
            "name": "Hip cramps or spasms"
        },
        {
            "id": "183",
            "name": "Hip lump or mass"
        },
        {
            "id": "184",
            "name": "Hip pain"
        },
        {
            "id": "185",
            "name": "Hip stiffness or tightness"
        },
        {
            "id": "186",
            "name": "Hip swelling"
        },
        {
            "id": "187",
            "name": "Hip symptoms"
        },
        {
            "id": "188",
            "name": "Hip weakness"
        },
        {
            "id": "699",
            "name": "Hives"
        },
        {
            "id": "189",
            "name": "Hoarse voice"
        },
        {
            "id": "700",
            "name": "Holding bowel movements"
        },
        {
            "id": "701",
            "name": "Holding objects closer to read"
        },
        {
            "id": "702",
            "name": "Holding objects further away to read"
        },
        {
            "id": "190",
            "name": "Hostile behavior"
        },
        {
            "id": "191",
            "name": "Hot flashes"
        },
        {
            "id": "703",
            "name": "Hot, dry skin"
        },
        {
            "id": "704",
            "name": "Hunched or stooped posture"
        },
        {
            "id": "705",
            "name": "Hunger"
        },
        {
            "id": "192",
            "name": "Hurts to breath"
        },
        {
            "id": "706",
            "name": "Hyperactive behavior"
        },
        {
            "id": "193",
            "name": "Hypernasality"
        },
        {
            "id": "707",
            "name": "Hyperventilating"
        },
        {
            "id": "194",
            "name": "Hysterical behavior"
        },
        {
            "id": "708",
            "name": "Impaired color vision"
        },
        {
            "id": "709",
            "name": "Impaired judgement"
        },
        {
            "id": "710",
            "name": "Impaired social skills"
        },
        {
            "id": "195",
            "name": "Impotence"
        },
        {
            "id": "711",
            "name": "Impulsive behavior"
        },
        {
            "id": "712",
            "name": "Inability to care for self"
        },
        {
            "id": "713",
            "name": "Inability to move"
        },
        {
            "id": "714",
            "name": "Inappropriate behavior"
        },
        {
            "id": "196",
            "name": "Incontinence of stool"
        },
        {
            "id": "197",
            "name": "Increased heart rate"
        },
        {
            "id": "715",
            "name": "Increased passing gas"
        },
        {
            "id": "198",
            "name": "Increased sensation"
        },
        {
            "id": "716",
            "name": "Increased sensitivity to cold"
        },
        {
            "id": "717",
            "name": "Increased sensitivity to heat"
        },
        {
            "id": "718",
            "name": "Increased speech volume"
        },
        {
            "id": "719",
            "name": "Increased talkativeness"
        },
        {
            "id": "720",
            "name": "Increased thirst"
        },
        {
            "id": "199",
            "name": "Infant feeding problem"
        },
        {
            "id": "200",
            "name": "Infant spitting up"
        },
        {
            "id": "201",
            "name": "Infant symptoms"
        },
        {
            "id": "202",
            "name": "Infertility"
        },
        {
            "id": "203",
            "name": "Infrequent menstruation"
        },
        {
            "id": "204",
            "name": "Insomnia"
        },
        {
            "id": "721",
            "name": "Intentional vomiting"
        },
        {
            "id": "205",
            "name": "Intermenstrual bleeding"
        },
        {
            "id": "722",
            "name": "Involuntary head turning or twisting"
        },
        {
            "id": "723",
            "name": "Involuntary movements"
        },
        {
            "id": "206",
            "name": "Involuntary urination"
        },
        {
            "id": "207",
            "name": "Irregular appearing nails"
        },
        {
            "id": "208",
            "name": "Irregular appearing scalp"
        },
        {
            "id": "209",
            "name": "Irregular belly button "
        },
        {
            "id": "210",
            "name": "Irregular heartbeat"
        },
        {
            "id": "211",
            "name": "Irregular menstrual flow"
        },
        {
            "id": "724",
            "name": "Irregular menstrual periods"
        },
        {
            "id": "212",
            "name": "Irritable infant"
        },
        {
            "id": "213",
            "name": "Itchiness of eye"
        },
        {
            "id": "214",
            "name": "Itching of scrotum"
        },
        {
            "id": "215",
            "name": "Itching of skin"
        },
        {
            "id": "216",
            "name": "Itching of the anus"
        },
        {
            "id": "725",
            "name": "Itching or burning"
        },
        {
            "id": "217",
            "name": "Itchy ear(s)"
        },
        {
            "id": "218",
            "name": "Itchy eyelid"
        },
        {
            "id": "219",
            "name": "Itchy scalp"
        },
        {
            "id": "220",
            "name": "Jaundice"
        },
        {
            "id": "726",
            "name": "Jaw locking"
        },
        {
            "id": "221",
            "name": "Jaw pain"
        },
        {
            "id": "222",
            "name": "Jaw swelling"
        },
        {
            "id": "727",
            "name": "Jerking eye movements"
        },
        {
            "id": "728",
            "name": "Joint aches"
        },
        {
            "id": "223",
            "name": "Joint cramps or spasms"
        },
        {
            "id": "729",
            "name": "Joint instability"
        },
        {
            "id": "730",
            "name": "Joint locking or catching"
        },
        {
            "id": "224",
            "name": "Joint lump or mass"
        },
        {
            "id": "225",
            "name": "Joint pain"
        },
        {
            "id": "226",
            "name": "Joint stiffness or tightness"
        },
        {
            "id": "227",
            "name": "Joint swelling"
        },
        {
            "id": "228",
            "name": "Joint symptoms"
        },
        {
            "id": "229",
            "name": "Joint weakness"
        },
        {
            "id": "731",
            "name": "Jumpiness or easily startled"
        },
        {
            "id": "230",
            "name": "Kidney mass"
        },
        {
            "id": "231",
            "name": "Kidney symptoms"
        },
        {
            "id": "232",
            "name": "Knee cramps or spasms"
        },
        {
            "id": "233",
            "name": "Knee lump or mass"
        },
        {
            "id": "234",
            "name": "Knee pain"
        },
        {
            "id": "235",
            "name": "Knee stiffness or tightness"
        },
        {
            "id": "236",
            "name": "Knee swelling"
        },
        {
            "id": "237",
            "name": "Knee symptoms"
        },
        {
            "id": "238",
            "name": "Knee weakness"
        },
        {
            "id": "732",
            "name": "Labored breathing"
        },
        {
            "id": "733",
            "name": "Lack of emotion"
        },
        {
            "id": "239",
            "name": "Lack of growth"
        },
        {
            "id": "734",
            "name": "Lack of motivation"
        },
        {
            "id": "735",
            "name": "Lack of pleasure"
        },
        {
            "id": "240",
            "name": "Lacrimation"
        },
        {
            "id": "241",
            "name": "Leg cramps or spasms"
        },
        {
            "id": "242",
            "name": "Leg lump or mass"
        },
        {
            "id": "243",
            "name": "Leg pain"
        },
        {
            "id": "244",
            "name": "Leg stiffness or tightness"
        },
        {
            "id": "245",
            "name": "Leg swelling"
        },
        {
            "id": "246",
            "name": "Leg symptoms"
        },
        {
            "id": "247",
            "name": "Leg weakness"
        },
        {
            "id": "736",
            "name": "Lightheadedness"
        },
        {
            "id": "248",
            "name": "Lip sore"
        },
        {
            "id": "249",
            "name": "Lip swelling"
        },
        {
            "id": "250",
            "name": "Long menstrual periods"
        },
        {
            "id": "737",
            "name": "Loss of balance"
        },
        {
            "id": "738",
            "name": "Loss of consciousness"
        },
        {
            "id": "739",
            "name": "Loss of coordination"
        },
        {
            "id": "740",
            "name": "Loss of height"
        },
        {
            "id": "741",
            "name": "Loss of outside 1/3 of eyebrow"
        },
        {
            "id": "251",
            "name": "Loss of sensation"
        },
        {
            "id": "252",
            "name": "Loss of sex drive"
        },
        {
            "id": "742",
            "name": "Loss of side vision"
        },
        {
            "id": "743",
            "name": "Loss of voice"
        },
        {
            "id": "253",
            "name": "Low back cramps or spasms"
        },
        {
            "id": "254",
            "name": "Low back lump or mass"
        },
        {
            "id": "255",
            "name": "Low back pain"
        },
        {
            "id": "256",
            "name": "Low back stiffness or tightness"
        },
        {
            "id": "257",
            "name": "Low back swelling"
        },
        {
            "id": "258",
            "name": "Low back symptoms"
        },
        {
            "id": "259",
            "name": "Low back weakness"
        },
        {
            "id": "744",
            "name": "Low blood pressure"
        },
        {
            "id": "262",
            "name": "Low self-esteem"
        },
        {
            "id": "263",
            "name": "Low urine output"
        },
        {
            "id": "260",
            "name": "Lower abdominal pain"
        },
        {
            "id": "261",
            "name": "Lower body pain"
        },
        {
            "id": "264",
            "name": "Lump in throat"
        },
        {
            "id": "745",
            "name": "Lump or bulge"
        },
        {
            "id": "265",
            "name": "Lump or mass of breast"
        },
        {
            "id": "266",
            "name": "Lump over jaw"
        },
        {
            "id": "267",
            "name": "Lymphedema"
        },
        {
            "id": "268",
            "name": "Mass in scrotum"
        },
        {
            "id": "269",
            "name": "Mass on ear"
        },
        {
            "id": "270",
            "name": "Mass on eyelid"
        },
        {
            "id": "271",
            "name": "Mass on vulva"
        },
        {
            "id": "272",
            "name": "Mass or swelling around the anus"
        },
        {
            "id": "273",
            "name": "Melena"
        },
        {
            "id": "746",
            "name": "Memory problems"
        },
        {
            "id": "274",
            "name": "Menopausal symptoms"
        },
        {
            "id": "275",
            "name": "Menstrual symptoms"
        },
        {
            "id": "747",
            "name": "Metallic taste in mouth"
        },
        {
            "id": "748",
            "name": "Missed or late menstrual period"
        },
        {
            "id": "749",
            "name": "Mood swings"
        },
        {
            "id": "750",
            "name": "Morning alcohol drinking"
        },
        {
            "id": "751",
            "name": "Morning joint stiffness"
        },
        {
            "id": "276",
            "name": "Mouth dryness"
        },
        {
            "id": "277",
            "name": "Mouth pain"
        },
        {
            "id": "752",
            "name": "Mouth sores"
        },
        {
            "id": "278",
            "name": "Mouth symptoms"
        },
        {
            "id": "279",
            "name": "Mouth ulcer"
        },
        {
            "id": "753",
            "name": "Muffled voice"
        },
        {
            "id": "754",
            "name": "Multiple bruises of different ages"
        },
        {
            "id": "755",
            "name": "Muscle cramps or spasms"
        },
        {
            "id": "280",
            "name": "Muscle cramps, contractures, or spasms"
        },
        {
            "id": "281",
            "name": "Muscle lump or mass"
        },
        {
            "id": "282",
            "name": "Muscle pain"
        },
        {
            "id": "756",
            "name": "Muscle stiffness"
        },
        {
            "id": "283",
            "name": "Muscle stiffness or tightness"
        },
        {
            "id": "284",
            "name": "Muscle swelling"
        },
        {
            "id": "285",
            "name": "Muscle symptoms"
        },
        {
            "id": "757",
            "name": "Muscle twitching"
        },
        {
            "id": "758",
            "name": "Muscle wasting"
        },
        {
            "id": "286",
            "name": "Muscle weakness"
        },
        {
            "id": "287",
            "name": "Musculoskeletal deformities"
        },
        {
            "id": "288",
            "name": "Musculoskeletal symptoms"
        },
        {
            "id": "289",
            "name": "Nailbiting"
        },
        {
            "id": "290",
            "name": "Nasal congestion"
        },
        {
            "id": "759",
            "name": "Nasal symptoms and one red eye"
        },
        {
            "id": "291",
            "name": "Nausea"
        },
        {
            "id": "760",
            "name": "Nausea or vomiting"
        },
        {
            "id": "292",
            "name": "Neck cramps or spasms"
        },
        {
            "id": "293",
            "name": "Neck mass"
        },
        {
            "id": "294",
            "name": "Neck pain"
        },
        {
            "id": "295",
            "name": "Neck stiffness or tightness"
        },
        {
            "id": "296",
            "name": "Neck swelling"
        },
        {
            "id": "297",
            "name": "Neck symptoms"
        },
        {
            "id": "298",
            "name": "Neck weakness"
        },
        {
            "id": "761",
            "name": "Need brighter light to read"
        },
        {
            "id": "762",
            "name": "Nervousness"
        },
        {
            "id": "299",
            "name": "Neurological symptoms"
        },
        {
            "id": "763",
            "name": "New onset asthma"
        },
        {
            "id": "764",
            "name": "Night sweats"
        },
        {
            "id": "300",
            "name": "Nightmares"
        },
        {
            "id": "765",
            "name": "Nighttime wheezing"
        },
        {
            "id": "766",
            "name": "No menstrual periods"
        },
        {
            "id": "767",
            "name": "Noisy breathing"
        },
        {
            "id": "302",
            "name": "Nose deformity"
        },
        {
            "id": "303",
            "name": "Nose symptoms"
        },
        {
            "id": "301",
            "name": "Nosebleed"
        },
        {
            "id": "768",
            "name": "Numbness or tingling"
        },
        {
            "id": "304",
            "name": "Obsessions and compulsions"
        },
        {
            "id": "769",
            "name": "Overweight"
        },
        {
            "id": "305",
            "name": "Pain"
        },
        {
            "id": "770",
            "name": "Pain during erection"
        },
        {
            "id": "306",
            "name": "Pain during intercourse"
        },
        {
            "id": "307",
            "name": "Pain during pregnancy"
        },
        {
            "id": "312",
            "name": "Pain in eye"
        },
        {
            "id": "313",
            "name": "Pain in gums"
        },
        {
            "id": "314",
            "name": "Pain in testicles"
        },
        {
            "id": "315",
            "name": "Pain of the anus"
        },
        {
            "id": "771",
            "name": "Pain or discomfort"
        },
        {
            "id": "316",
            "name": "Pain or soreness of breast"
        },
        {
            "id": "772",
            "name": "Pain when moving eyes"
        },
        {
            "id": "773",
            "name": "Pain when swallowing"
        },
        {
            "id": "774",
            "name": "Pain with sexual intercourse"
        },
        {
            "id": "775",
            "name": "Pain with urination"
        },
        {
            "id": "776",
            "name": "Painful bowel movements"
        },
        {
            "id": "777",
            "name": "Painful ejaculation"
        },
        {
            "id": "308",
            "name": "Painful menstruation"
        },
        {
            "id": "309",
            "name": "Painful prostate"
        },
        {
            "id": "778",
            "name": "Painful red lump on eyelid"
        },
        {
            "id": "310",
            "name": "Painful sinuses"
        },
        {
            "id": "311",
            "name": "Painful urination"
        },
        {
            "id": "779",
            "name": "Pale skin"
        },
        {
            "id": "317",
            "name": "Pallor"
        },
        {
            "id": "318",
            "name": "Palpitations"
        },
        {
            "id": "780",
            "name": "Paranoid behavior"
        },
        {
            "id": "319",
            "name": "Paresthesia"
        },
        {
            "id": "781",
            "name": "Partial vision loss"
        },
        {
            "id": "320",
            "name": "Pelvic pain"
        },
        {
            "id": "321",
            "name": "Pelvic pressure"
        },
        {
            "id": "322",
            "name": "Pelvic symptoms"
        },
        {
            "id": "323",
            "name": "Penile discharge"
        },
        {
            "id": "324",
            "name": "Penis pain"
        },
        {
            "id": "325",
            "name": "Penis redness"
        },
        {
            "id": "326",
            "name": "Penis symptoms"
        },
        {
            "id": "327",
            "name": "Peripheral edema"
        },
        {
            "id": "782",
            "name": "Personality changes"
        },
        {
            "id": "328",
            "name": "Plugged feeling in ear"
        },
        {
            "id": "329",
            "name": "Polyuria"
        },
        {
            "id": "330",
            "name": "Poor circulation"
        },
        {
            "id": "783",
            "name": "Poor concentration"
        },
        {
            "id": "784",
            "name": "Poor personal hygiene"
        },
        {
            "id": "785",
            "name": "Popping or snapping sound from joint"
        },
        {
            "id": "786",
            "name": "Post nasal drip"
        },
        {
            "id": "331",
            "name": "Postpartum problems of the breast"
        },
        {
            "id": "332",
            "name": "Posture problems"
        },
        {
            "id": "787",
            "name": "Pounding heart"
        },
        {
            "id": "333",
            "name": "Premature ejaculation"
        },
        {
            "id": "334",
            "name": "Premenstrual tension or irritability"
        },
        {
            "id": "335",
            "name": "Preoccupation with sex"
        },
        {
            "id": "788",
            "name": "Pressure or fullness"
        },
        {
            "id": "789",
            "name": "Pressure or heaviness"
        },
        {
            "id": "341",
            "name": "Problem with voice"
        },
        {
            "id": "336",
            "name": "Problems during pregnancy"
        },
        {
            "id": "337",
            "name": "Problems with lymph nodes (glands)"
        },
        {
            "id": "338",
            "name": "Problems with movement"
        },
        {
            "id": "339",
            "name": "Problems with orgasm"
        },
        {
            "id": "340",
            "name": "Problems with shape or size of breast"
        },
        {
            "id": "790",
            "name": "Prolonged bleeding"
        },
        {
            "id": "791",
            "name": "Prolonged breathing pauses"
        },
        {
            "id": "342",
            "name": "Prostate symptoms"
        },
        {
            "id": "792",
            "name": "Protruding rectal material"
        },
        {
            "id": "793",
            "name": "Protruding vaginal material"
        },
        {
            "id": "343",
            "name": "Psychological and mental symptoms"
        },
        {
            "id": "344",
            "name": "Psychosexual disorders"
        },
        {
            "id": "794",
            "name": "Puffy eyelids"
        },
        {
            "id": "345",
            "name": "Pulling at ears"
        },
        {
            "id": "795",
            "name": "Pulling out beard"
        },
        {
            "id": "796",
            "name": "Pulling out eyebrows"
        },
        {
            "id": "797",
            "name": "Pulling out eyelashes"
        },
        {
            "id": "798",
            "name": "Pulling out hair"
        },
        {
            "id": "799",
            "name": "Pulsating sensation"
        },
        {
            "id": "800",
            "name": "Punching or kicking in sleep"
        },
        {
            "id": "346",
            "name": "Pupils unequal"
        },
        {
            "id": "347",
            "name": "Pus draining from ear"
        },
        {
            "id": "348",
            "name": "Pus in sputum"
        },
        {
            "id": "349",
            "name": "Pus in urine"
        },
        {
            "id": "801",
            "name": "Rapid breathing"
        },
        {
            "id": "802",
            "name": "Rapid heart rate"
        },
        {
            "id": "803",
            "name": "Rapid speech"
        },
        {
            "id": "804",
            "name": "Recent memory loss"
        },
        {
            "id": "350",
            "name": "Recent pregnancy"
        },
        {
            "id": "351",
            "name": "Recent weight loss"
        },
        {
            "id": "352",
            "name": "Rectal bleeding"
        },
        {
            "id": "807",
            "name": "Red eye"
        },
        {
            "id": "805",
            "name": "Red eyes"
        },
        {
            "id": "808",
            "name": "Red gums"
        },
        {
            "id": "809",
            "name": "Red or black spots on fingernails"
        },
        {
            "id": "810",
            "name": "Red spots"
        },
        {
            "id": "811",
            "name": "Red spots inside lower eyelid"
        },
        {
            "id": "806",
            "name": "Red tongue"
        },
        {
            "id": "353",
            "name": "Redness in ear"
        },
        {
            "id": "354",
            "name": "Redness in or around nose"
        },
        {
            "id": "812",
            "name": "Reduced productivity at work"
        },
        {
            "id": "355",
            "name": "Regurgitation"
        },
        {
            "id": "813",
            "name": "Regurgitation of food or liquid"
        },
        {
            "id": "814",
            "name": "Repeats phrases"
        },
        {
            "id": "815",
            "name": "Repetitive behaviors"
        },
        {
            "id": "817",
            "name": "Restless legs"
        },
        {
            "id": "818",
            "name": "Restless or irritability"
        },
        {
            "id": "816",
            "name": "Restless sleep"
        },
        {
            "id": "356",
            "name": "Restlessness"
        },
        {
            "id": "819",
            "name": "Restrictive dieting"
        },
        {
            "id": "357",
            "name": "Retention of urine"
        },
        {
            "id": "358",
            "name": "Rib pain"
        },
        {
            "id": "359",
            "name": "Ringing in ear"
        },
        {
            "id": "820",
            "name": "Ringing in ears"
        },
        {
            "id": "821",
            "name": "Runny nose"
        },
        {
            "id": "822",
            "name": "Sadness"
        },
        {
            "id": "823",
            "name": "Scaley skin on eyelids"
        },
        {
            "id": "360",
            "name": "Scanty menstrual flow"
        },
        {
            "id": "824",
            "name": "See letters, numbers or musical notes as colors"
        },
        {
            "id": "361",
            "name": "Seizures"
        },
        {
            "id": "825",
            "name": "Sensation of something in eye"
        },
        {
            "id": "826",
            "name": "Sense of impending doom"
        },
        {
            "id": "827",
            "name": "Sensitive to light"
        },
        {
            "id": "828",
            "name": "Sensitive to noise"
        },
        {
            "id": "362",
            "name": "Sensory disturbance"
        },
        {
            "id": "829",
            "name": "Shadow over part of vision"
        },
        {
            "id": "830",
            "name": "Shaking"
        },
        {
            "id": "831",
            "name": "Shaking chills"
        },
        {
            "id": "832",
            "name": "Shaking hands or tremor"
        },
        {
            "id": "363",
            "name": "Sharp abdominal pain"
        },
        {
            "id": "364",
            "name": "Sharp chest pain"
        },
        {
            "id": "833",
            "name": "Short arms and legs"
        },
        {
            "id": "834",
            "name": "Short attention span"
        },
        {
            "id": "835",
            "name": "Short stature"
        },
        {
            "id": "836",
            "name": "Short, wide neck"
        },
        {
            "id": "837",
            "name": "Shortening of limb"
        },
        {
            "id": "365",
            "name": "Shortness of breath"
        },
        {
            "id": "366",
            "name": "Shoulder cramps or spasms"
        },
        {
            "id": "367",
            "name": "Shoulder lump or mass"
        },
        {
            "id": "368",
            "name": "Shoulder pain"
        },
        {
            "id": "369",
            "name": "Shoulder stiffness or tightness"
        },
        {
            "id": "370",
            "name": "Shoulder swelling"
        },
        {
            "id": "371",
            "name": "Shoulder symptoms"
        },
        {
            "id": "372",
            "name": "Shoulder weakness"
        },
        {
            "id": "838",
            "name": "Shuffling gait"
        },
        {
            "id": "373",
            "name": "Side pain"
        },
        {
            "id": "839",
            "name": "Single palm crease"
        },
        {
            "id": "374",
            "name": "Sinus congestion"
        },
        {
            "id": "375",
            "name": "Sinus problems"
        },
        {
            "id": "840",
            "name": "Skin blisters"
        },
        {
            "id": "841",
            "name": "Skin bumps"
        },
        {
            "id": "842",
            "name": "Skin darkening"
        },
        {
            "id": "376",
            "name": "Skin dryness, peeling, scaliness or roughness"
        },
        {
            "id": "377",
            "name": "Skin growth"
        },
        {
            "id": "843",
            "name": "Skin hardening"
        },
        {
            "id": "378",
            "name": "Skin irritation"
        },
        {
            "id": "379",
            "name": "Skin lesion"
        },
        {
            "id": "380",
            "name": "Skin looks infected"
        },
        {
            "id": "381",
            "name": "Skin moles"
        },
        {
            "id": "382",
            "name": "Skin oiliness"
        },
        {
            "id": "383",
            "name": "Skin on arm or hand looks infected"
        },
        {
            "id": "384",
            "name": "Skin on head or neck looks infected"
        },
        {
            "id": "385",
            "name": "Skin on leg or foot looks infected"
        },
        {
            "id": "844",
            "name": "Skin open sore"
        },
        {
            "id": "386",
            "name": "Skin pain"
        },
        {
            "id": "845",
            "name": "Skin peeling, cracking or scaling"
        },
        {
            "id": "387",
            "name": "Skin rash"
        },
        {
            "id": "846",
            "name": "Skin redness"
        },
        {
            "id": "388",
            "name": "Skin swelling"
        },
        {
            "id": "847",
            "name": "Skin thickening"
        },
        {
            "id": "389",
            "name": "Sleep disturbance"
        },
        {
            "id": "848",
            "name": "Sleep walking"
        },
        {
            "id": "390",
            "name": "Sleepiness"
        },
        {
            "id": "391",
            "name": "Sleepwalking"
        },
        {
            "id": "849",
            "name": "Slow growth"
        },
        {
            "id": "850",
            "name": "Slow heart rate"
        },
        {
            "id": "851",
            "name": "Slow or irregular breathing"
        },
        {
            "id": "852",
            "name": "Slow or weak urine stream"
        },
        {
            "id": "853",
            "name": "Slow thinking"
        },
        {
            "id": "854",
            "name": "Slurred speech"
        },
        {
            "id": "392",
            "name": "Slurring words"
        },
        {
            "id": "855",
            "name": "Small pupils"
        },
        {
            "id": "393",
            "name": "Smoking problems"
        },
        {
            "id": "856",
            "name": "Smooth tongue"
        },
        {
            "id": "394",
            "name": "Sneezing"
        },
        {
            "id": "857",
            "name": "Snoring"
        },
        {
            "id": "858",
            "name": "Socially withdrawn"
        },
        {
            "id": "395",
            "name": "Sore in nose"
        },
        {
            "id": "396",
            "name": "Sore lymph nodes"
        },
        {
            "id": "859",
            "name": "Sore or burning eyes"
        },
        {
            "id": "397",
            "name": "Sore throat"
        },
        {
            "id": "860",
            "name": "Sore tongue"
        },
        {
            "id": "861",
            "name": "Soreness or burning inside of mouth"
        },
        {
            "id": "398",
            "name": "Speech disturbance"
        },
        {
            "id": "862",
            "name": "Spinning sensation"
        },
        {
            "id": "863",
            "name": "Spots on throat"
        },
        {
            "id": "864",
            "name": "Spots on tonsils"
        },
        {
            "id": "399",
            "name": "Spots or clouds in vision"
        },
        {
            "id": "400",
            "name": "Spotting or bleeding during pregnancy"
        },
        {
            "id": "865",
            "name": "Squatting"
        },
        {
            "id": "866",
            "name": "Squinting eyes"
        },
        {
            "id": "867",
            "name": "Stiff neck"
        },
        {
            "id": "401",
            "name": "Stiffness all over"
        },
        {
            "id": "868",
            "name": "Stiffness or decreased movement"
        },
        {
            "id": "402",
            "name": "Stomach bloating"
        },
        {
            "id": "869",
            "name": "Stomach cramps"
        },
        {
            "id": "870",
            "name": "Stool leaking"
        },
        {
            "id": "871",
            "name": "Straining with bowel movements"
        },
        {
            "id": "872",
            "name": "Strange smell or taste"
        },
        {
            "id": "403",
            "name": "Stuttering or stammering"
        },
        {
            "id": "873",
            "name": "Sudden flash of lights"
        },
        {
            "id": "874",
            "name": "Sudden numbness or weakness on one side of body"
        },
        {
            "id": "875",
            "name": "Sudden urge to urinate"
        },
        {
            "id": "876",
            "name": "Sunken eyes"
        },
        {
            "id": "877",
            "name": "Sunken soft spot on top of head"
        },
        {
            "id": "404",
            "name": "Suprapubic pain"
        },
        {
            "id": "405",
            "name": "Sweating"
        },
        {
            "id": "878",
            "name": "Swelling"
        },
        {
            "id": "406",
            "name": "Swelling of scrotum"
        },
        {
            "id": "407",
            "name": "Swollen abdomen"
        },
        {
            "id": "408",
            "name": "Swollen eye"
        },
        {
            "id": "879",
            "name": "Swollen gums"
        },
        {
            "id": "880",
            "name": "Swollen lips"
        },
        {
            "id": "409",
            "name": "Swollen lymph nodes"
        },
        {
            "id": "410",
            "name": "Swollen or red tonsils"
        },
        {
            "id": "411",
            "name": "Swollen tongue"
        },
        {
            "id": "881",
            "name": "Swollen tonsils"
        },
        {
            "id": "412",
            "name": "Symptoms of bladder"
        },
        {
            "id": "413",
            "name": "Symptoms of eye"
        },
        {
            "id": "414",
            "name": "Symptoms of infants"
        },
        {
            "id": "415",
            "name": "Symptoms of prostate"
        },
        {
            "id": "416",
            "name": "Symptoms of scrotum and testes"
        },
        {
            "id": "417",
            "name": "Symptoms of the anus"
        },
        {
            "id": "418",
            "name": "Symptoms of the breast"
        },
        {
            "id": "419",
            "name": "Symptoms of the face"
        },
        {
            "id": "420",
            "name": "Symptoms of the female reproductive system"
        },
        {
            "id": "421",
            "name": "Symptoms of the jaw"
        },
        {
            "id": "422",
            "name": "Symptoms of the kidneys"
        },
        {
            "id": "423",
            "name": "Symptoms of the lips"
        },
        {
            "id": "424",
            "name": "Symptoms of the scrotum and testes"
        },
        {
            "id": "425",
            "name": "Symptoms of the skin"
        },
        {
            "id": "882",
            "name": "Taste of acid in mouth"
        },
        {
            "id": "883",
            "name": "Taste words when they are heard"
        },
        {
            "id": "884",
            "name": "Tearing in one eye"
        },
        {
            "id": "426",
            "name": "Teeth and gum problems"
        },
        {
            "id": "885",
            "name": "Teeth do not fit like they used to"
        },
        {
            "id": "427",
            "name": "Temper problems"
        },
        {
            "id": "886",
            "name": "Tender glands"
        },
        {
            "id": "887",
            "name": "Tenderness to touch"
        },
        {
            "id": "888",
            "name": "Testicles shrinkage"
        },
        {
            "id": "889",
            "name": "Testicular pain"
        },
        {
            "id": "890",
            "name": "Thick saliva or mucus"
        },
        {
            "id": "891",
            "name": "Thin stools"
        },
        {
            "id": "428",
            "name": "Thirst"
        },
        {
            "id": "429",
            "name": "Throat feels tight"
        },
        {
            "id": "430",
            "name": "Throat irritation"
        },
        {
            "id": "431",
            "name": "Throat redness"
        },
        {
            "id": "432",
            "name": "Throat swelling"
        },
        {
            "id": "433",
            "name": "Throat symptoms"
        },
        {
            "id": "892",
            "name": "Throat tightness"
        },
        {
            "id": "434",
            "name": "Thumbsucking"
        },
        {
            "id": "893",
            "name": "Tightness"
        },
        {
            "id": "894",
            "name": "Tilts head to look at something"
        },
        {
            "id": "895",
            "name": "Tires quickly"
        },
        {
            "id": "435",
            "name": "Tongue bleeding"
        },
        {
            "id": "436",
            "name": "Tongue lesions"
        },
        {
            "id": "437",
            "name": "Tongue pain"
        },
        {
            "id": "438",
            "name": "Too little hair"
        },
        {
            "id": "439",
            "name": "Toothache"
        },
        {
            "id": "896",
            "name": "Trembling"
        },
        {
            "id": "897",
            "name": "Trouble distinguishing color shades"
        },
        {
            "id": "898",
            "name": "Twisting or rotation of limb"
        },
        {
            "id": "899",
            "name": "Unable to bear weight"
        },
        {
            "id": "900",
            "name": "Unable to bend foot down"
        },
        {
            "id": "901",
            "name": "Unable to blink or close eyelid"
        },
        {
            "id": "902",
            "name": "Unable to grip"
        },
        {
            "id": "903",
            "name": "Unable to move arm"
        },
        {
            "id": "904",
            "name": "Unable to move joint"
        },
        {
            "id": "905",
            "name": "Unable to move leg"
        },
        {
            "id": "906",
            "name": "Unable to obtain or maintain erection"
        },
        {
            "id": "907",
            "name": "Unable to open mouth"
        },
        {
            "id": "908",
            "name": "Uncontrollable verbal outbursts"
        },
        {
            "id": "440",
            "name": "Underweight"
        },
        {
            "id": "909",
            "name": "Unequal pupils"
        },
        {
            "id": "441",
            "name": "Unpredictable menstruation"
        },
        {
            "id": "910",
            "name": "Unusual behavior"
        },
        {
            "id": "442",
            "name": "Unusual color or odor to urine"
        },
        {
            "id": "911",
            "name": "Unusual facial expression"
        },
        {
            "id": "912",
            "name": "Unusual or suspicious mole"
        },
        {
            "id": "914",
            "name": "Unusual taste in mouth"
        },
        {
            "id": "913",
            "name": "Unusually short forth fingers"
        },
        {
            "id": "443",
            "name": "Unwanted hair"
        },
        {
            "id": "444",
            "name": "Upper abdominal pain"
        },
        {
            "id": "915",
            "name": "Upset stomach"
        },
        {
            "id": "916",
            "name": "Upward curving of nails"
        },
        {
            "id": "917",
            "name": "Urine leaking"
        },
        {
            "id": "445",
            "name": "Uterine contractions"
        },
        {
            "id": "446",
            "name": "Vaginal bleeding"
        },
        {
            "id": "447",
            "name": "Vaginal bleeding after menopause"
        },
        {
            "id": "448",
            "name": "Vaginal bleeding after sex"
        },
        {
            "id": "918",
            "name": "Vaginal bleeding between periods"
        },
        {
            "id": "449",
            "name": "Vaginal discharge"
        },
        {
            "id": "450",
            "name": "Vaginal dryness"
        },
        {
            "id": "451",
            "name": "Vaginal itching"
        },
        {
            "id": "919",
            "name": "Vaginal odor"
        },
        {
            "id": "452",
            "name": "Vaginal pain"
        },
        {
            "id": "453",
            "name": "Vaginal redness"
        },
        {
            "id": "454",
            "name": "Vaginal symptoms"
        },
        {
            "id": "920",
            "name": "Visible bugs or parasites"
        },
        {
            "id": "921",
            "name": "Visible deformity"
        },
        {
            "id": "922",
            "name": "Visible pulsations"
        },
        {
            "id": "923",
            "name": "Vision fading of colors"
        },
        {
            "id": "455",
            "name": "Visual disturbance"
        },
        {
            "id": "924",
            "name": "Visual halos around lights"
        },
        {
            "id": "456",
            "name": "Vomiting"
        },
        {
            "id": "457",
            "name": "Vomiting blood"
        },
        {
            "id": "458",
            "name": "Vulvar irritation"
        },
        {
            "id": "459",
            "name": "Vulvar sore"
        },
        {
            "id": "460",
            "name": "Vulvar symptoms"
        },
        {
            "id": "925",
            "name": "Warm to touch"
        },
        {
            "id": "461",
            "name": "Warts"
        },
        {
            "id": "926",
            "name": "Watery eyes"
        },
        {
            "id": "462",
            "name": "Weakness"
        },
        {
            "id": "463",
            "name": "Weight gain"
        },
        {
            "id": "464",
            "name": "Weight loss"
        },
        {
            "id": "927",
            "name": "Welts"
        },
        {
            "id": "465",
            "name": "Wheezing"
        },
        {
            "id": "466",
            "name": "White discharge from eye"
        },
        {
            "id": "928",
            "name": "White patches inside mouth"
        },
        {
            "id": "929",
            "name": "White patches on tongue"
        },
        {
            "id": "930",
            "name": "Worms in stool"
        },
        {
            "id": "467",
            "name": "Wrinkles on skin"
        },
        {
            "id": "468",
            "name": "Wrist cramps or spasms"
        },
        {
            "id": "469",
            "name": "Wrist lump or mass"
        },
        {
            "id": "470",
            "name": "Wrist pain"
        },
        {
            "id": "471",
            "name": "Wrist stiffness or tightness"
        },
        {
            "id": "472",
            "name": "Wrist swelling"
        },
        {
            "id": "473",
            "name": "Wrist symptoms"
        },
        {
            "id": "474",
            "name": "Wrist weakness"
        },
        {
            "id": "931",
            "name": "Yelling out during sleep"
        },
        {
            "id": "932",
            "name": "Yellow eyes"
        },
        {
            "id": "933",
            "name": "Yellow skin"
        }
    ]
};

}