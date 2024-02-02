import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean=false;
  btnLoading: boolean =false;
  error: boolean= false;
  invalid : any = {
    email: false,
    password : false
  }

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.loading=true;
    this.authService.isAuthenticated()?.subscribe((data)=>{
      this.loading=false;
      this.router.navigate([this.authService.getRedirectURL()])
    },()=>{
      this.loading=false;
    });
    
  }

  
  resetFormResponse(){
    this.invalid.email=false;
    this.invalid.password=false;
    this.error=false;
  }

  
  onSubmit(authForm: NgForm) {

    this.resetFormResponse();
  
    if(authForm.form.get('email')?.status=='INVALID'){
        this.invalid.email=true;
       
    }
    if(authForm.form.get('password')?.status=='INVALID'){
        this.invalid.password=true;
        
    }
    if(authForm.form.valid==true){
    this.btnLoading=true;
    this.authService.login(authForm.form.value)
    .subscribe(()=>{
      this.btnLoading=false;
      this.router.navigate([this.authService.getRedirectURL() || '/explore'])
    }, 
    (error)=>{
      if(error.status!=400){
        this.router.navigate(['/server-error'])
        return
      }
      this.btnLoading=false;
      this.error=true;
     
    })
  }
    
  }
  signup(){
    this.router.navigate(['/signup'])
  }


}
