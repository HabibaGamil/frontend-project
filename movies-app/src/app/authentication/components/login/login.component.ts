import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean =false;
  error: boolean= false;

  constructor(private authService: AuthService, private router: Router){}

  
  onSubmit(authForm: NgForm) {
    console.log(authForm.form.value)
    this.loading=true;

    this.authService.login(authForm.form.value)
    .subscribe(()=>{
      console.log("in subscribe function")
      this.loading=false;
      this.router.navigate(['/explore'])
    }, 
    ()=>{
      this.error=true;
    })
    
  }


}
