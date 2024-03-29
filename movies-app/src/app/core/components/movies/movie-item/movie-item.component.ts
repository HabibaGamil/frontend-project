import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {

  @Input()
  movie! : Movie;

  constructor(private router: Router){}

  viewMovie(){
    this.router.navigate(['discover/movie/'+ this.movie.id], {state: {movie : this.movie}})
  }

}
