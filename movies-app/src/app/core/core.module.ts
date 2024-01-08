import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieComponent } from './components/movie/movie.component';



@NgModule({
  declarations: [  
    MoviesComponent,
    MovieItemComponent,
    NavbarComponent,
    MovieComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    MoviesComponent,
    NavbarComponent,
    MovieComponent
  ]
})
export class CoreModule { }
