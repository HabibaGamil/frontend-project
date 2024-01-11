import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieItemComponent } from './components/movies/movie-item/movie-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './components/movie-page/movie.component';


@NgModule({
  declarations: [  
    MoviesComponent,
    MovieItemComponent,
    MovieComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    MoviesComponent,
    MovieComponent
  ]
})
export class CoreModule { }
