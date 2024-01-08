import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private lang : string = 'en';
  languageSubject = new BehaviorSubject<string>('en');

  constructor() { }

  getLanguage():string{
     return this.lang;
  }

  toggleLanguage(){
    this.lang = this.lang== 'en' ? 'ar' : 'en';
    this.languageSubject.next(this.lang);
  }
}
