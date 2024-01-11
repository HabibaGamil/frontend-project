import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { AuthGaurdService } from './authentication/services/auth-gaurd.service';
import { MovieComponent } from './core/components/movie-page/movie.component';
import { MoviesComponent } from './core/components/movies/movies.component';

const routes: Routes = [
  {path: '', redirectTo: "explore", pathMatch:'full'},

  {path: "login", component: LoginComponent,
  loadChildren: ()=> 
  import('./core/core.module').then(
     (mod) => mod.CoreModule
  )},

  {path: "explore", component: MoviesComponent, 
    canActivate: [AuthGaurdService],
    loadChildren: ()=> 
    import('./authentication/authentication.module').then(
      (mod) => mod.AuthenticationModule
    )},

  {path: "movie/:id", component: MovieComponent,canActivate: [AuthGaurdService] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
