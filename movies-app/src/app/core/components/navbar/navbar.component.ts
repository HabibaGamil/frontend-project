import { Component } from '@angular/core';
import { AppSettingsService } from '../../services/app-settings.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //This flag indicates if arabic setting is chosen in the app
  arFlag : boolean = false;
  loginFlag: boolean = false;

  constructor(private appSettings : AppSettingsService, private authServie :AuthService){
  }
  ngOnInit(){
    this.subscribeToLangSubject();
    this.subscribleToAuthSubject();
    
  }
  subscribeToLangSubject(){
    this.appSettings.languageSubject
    .subscribe((lang)=>{ 
      console.log(lang)
      if (lang=='ar'){
        this.arFlag=true;
      }else {
        this.arFlag=false;
      }
      })
  }
  subscribleToAuthSubject(){
    this.authServie.authSubject
    .subscribe((login)=>{
        console.log("in navbar function "+ login)
        this.loginFlag=login;
      
    })
  }
  toggleLanguage(){
    this.appSettings.toggleLanguage();
  }
}
