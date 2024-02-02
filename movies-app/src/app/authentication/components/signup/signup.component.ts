import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  btnLoading: boolean =false;
  error: boolean= false;
  invalid : any = {
    email: false,
    password : false,
    passwordMatch: false
  }
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){

  }

  onSubmit(authForm: NgForm) {
    this.resetFormResponse();

    console.log(authForm.form)

    if(authForm.form.get('email')?.status=='INVALID'){
      this.invalid.email=true;
     
   }
   if(authForm.form.get('password')?.status=='INVALID'){
      this.invalid.password=true;
      
   }
   if(authForm.form.get('repassword')?.value!=authForm.form.get('password')?.value && !this.invalid.password){
      this.invalid.passwordMatch=true;
      return;
   }

   if(authForm.form.valid==true){
    this.btnLoading=true;
    this.authService.signup(authForm.form.value).subscribe(()=>{
      this.btnLoading=false;
      this.router.navigate([this.authService.getRedirectURL() || '/explore'])
    }, 
    (error)=>{
      console.log(error)
      this.btnLoading=false;
      this.error=true;
    })

  }
}
    
  resetFormResponse(){
    this.invalid.email=false;
    this.invalid.password=false;
    this.invalid.passwordMatch=false;
  }

  login(){
    this.router.navigate(['/login'])
  }

}
