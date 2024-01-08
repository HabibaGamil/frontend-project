import { Component, HostListener } from '@angular/core';
import { Movie } from '../../movie';
import { AppSettingsService } from '../../services/app-settings.service';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movies: Movie[] = [];
  batch : number = 1;
  loading: boolean = true;
  arFlag: boolean = true;

  constructor(private movieService: MovieService, private appSettings: AppSettingsService) {}

  ngOnInit(){
    this.getMovies()
    this.appSettings.languageSubject.subscribe((lang)=>{

      if (lang=='ar'){
        this.arFlag=true;
      }else {
        this.arFlag=false;
      }
      this.movies=[];
      this.batch=1;
      this.getMovies();

    })
  }
  getMovies(){
    this.loading=true;
    this.movieService.getMovies(this.batch).subscribe(
      (result: Movie[]) => {
        this.movies.push(...result);
        this.loading=false;
        this.batch++;
      });
     
  }
@HostListener('window:scroll', [])
onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    if (scrollPosition + windowHeight + 5 >= documentHeight &&  !this.loading) {
    //  console.log('Scrolled to the bottom of the window');
      this.getMovies()
          
    }
}

}
