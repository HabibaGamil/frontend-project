import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { SignupComponent } from './authentication/components/signup/signup.component';
import { AuthGaurdService } from './authentication/services/auth-guard/auth-gaurd.service';
import { FormGuardService } from './authentication/services/form-guard/form-guard.service';
import { MovieComponent } from './core/components/movie-page/movie.component';
import { MoviesComponent } from './core/components/movies/movies.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';

const routes: Routes = [

  {path: '', redirectTo: "explore", pathMatch:'full'},
  {path: "login", component: LoginComponent,canActivate: [FormGuardService]},
  {path: "signup", component: SignupComponent, canActivate: [FormGuardService]},
  {path: "explore", component: MoviesComponent,canActivate: [AuthGaurdService]},
  {path: "movie/:id", component: MovieComponent,canActivate: [AuthGaurdService] },
  {path: "page-not-found", component: PageNotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
