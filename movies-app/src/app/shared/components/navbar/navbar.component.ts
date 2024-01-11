import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { AppSettingsService } from '../../../core/services/app-settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  

  arFlag : boolean = false;
  loginFlag: boolean = false;

  constructor(private appSettings : AppSettingsService,
              private authService :AuthService,
              private router: Router){}
  ngOnInit(){
    this.subscribeToLangSubject();
    this.subscribleToAuthSubject();
    
  }
  subscribeToLangSubject(){
    this.appSettings.languageSubject
    .subscribe((lang)=>{ 
      if (lang=='ar'){
        this.arFlag=true;
      }else {
        this.arFlag=false;
      }
      })
  }
  subscribleToAuthSubject(){
    this.authService.authSubject
    .subscribe((login)=>{
        this.loginFlag=login;
      
    })
  }
  toggleLanguage(){
    this.appSettings.toggleLanguage();
  }

  goToHome(){
    this.router.navigate(['/explore'])
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }



}
