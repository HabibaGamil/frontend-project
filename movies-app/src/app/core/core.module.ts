import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieItemComponent } from './components/movies/movie-item/movie-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './components/movie-page/movie.component';
import { AuthGaurdService } from '../authentication/services/auth-guard/auth-gaurd.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: MoviesComponent,canActivate: [AuthGaurdService]},
  {path: "movie/:id", component: MovieComponent,canActivate: [AuthGaurdService] }

];


@NgModule({
  declarations: [  
    MoviesComponent,
    MovieItemComponent,
    MovieComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MoviesComponent,
    MovieComponent
  ]
})
export class CoreModule { }
