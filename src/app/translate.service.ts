import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TranslateService {
  
  //Settings
  // 0 = English
  // 1 = Finnish
  // 2 = Swedish

  private setting: number;
  private url: string;
  private langArray: Array<string>;

  //Observable that components subscribe to
  private lang: BehaviorSubject<Object>;
  public langObservable: Observable<Object>;



  constructor( private http: Http ) {

    this.setting = 0;
    this.url = environment.translation.url;
    this.langArray = [
      'en.json', //0
      'fi.json', //1
      'sv.json' //2
    ]

    this.lang = new BehaviorSubject( this.getLanguage() );
    this.langObservable = this.lang.asObservable();

  }

  /**
   * Returns currently set language
   * @returns Json language file
  */
  private getLanguage() {
    return this.http.request( this.url+this.langArray[this.setting] )
              .map(res =>
                res.json()
              )
  }

  /**
   * This sets the language with number as parameter
   * @param setting 0: en, 1: fi, 2: sv
  */
  setLanguage(setting){
    this.setting = setting;
    this.getLanguage().subscribe( res => this.lang.next(res))
  }

}
