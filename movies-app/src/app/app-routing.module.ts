import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { AuthGaurdService } from './authentication/services/auth-gaurd.service';
import { MovieItemComponent } from './core/components/movie-item/movie-item.component';
import { MovieComponent } from './core/components/movie/movie.component';
import { MoviesComponent } from './core/components/movies/movies.component';

const routes: Routes = [
 
  {path: "explore", component: MoviesComponent, canActivate: [AuthGaurdService]},
  {path: "movie/:id", component: MovieComponent,canActivate: [AuthGaurdService] },
  {path: "login", component: LoginComponent},
  {path: '', redirectTo: "explore", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
