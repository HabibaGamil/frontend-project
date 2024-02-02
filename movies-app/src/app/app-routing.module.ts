import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { SignupComponent } from './authentication/components/signup/signup.component';
import { AuthGaurdService } from './authentication/services/auth-guard/auth-gaurd.service';
import { FormGuardService } from './authentication/services/form-guard/form-guard.service';
import { MovieComponent } from './core/components/movie-page/movie.component';
import { MoviesComponent } from './core/components/movies/movies.component';

const routes: Routes = [
  {path: '', redirectTo: "explore", pathMatch:'full'},
  {path: "signup", component: SignupComponent, canActivate: [FormGuardService]},
  {path: "login", component: LoginComponent,canActivate: [FormGuardService]},
  {path: "explore", component: MoviesComponent,canActivate: [AuthGaurdService]},
  {path: "movie/:id", component: MovieComponent,canActivate: [AuthGaurdService] }

  
  // loadChildren: ()=> 
  // import('./core/core.module').then(
  //    (mod) => mod.CoreModule
  // )},

    // loadChildren: ()=> 
    // import('./authentication/authentication.module').then(
    //   (mod) => mod.AuthenticationModule
    // )},

 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
