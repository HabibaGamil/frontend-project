import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/login/verify/verify.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    LoginComponent,
  ]
})
export class AuthenticationModule { }
