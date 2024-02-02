import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  loginFlag: boolean = false;

  constructor(private authService :AuthService,
              private router: Router){}
  ngOnInit(){
    this.subscribleToAuthSubject();
    
  }
  
  subscribleToAuthSubject(){
    this.authService.authSubject
    .subscribe((login)=>{
        this.loginFlag=login;
      
    })
  }
  goToHome(){
    this.router.navigate(['/explore'])
  }
  logout(){
    this.authService.logout()?.subscribe(()=>{
      this.router.navigate(['/login'])
    });
    
  }



}
