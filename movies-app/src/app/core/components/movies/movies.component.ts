import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../movie';
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
  noMoreData : boolean = false;

  constructor(private movieService: MovieService,private router: Router) {}

  ngOnInit(){
    this.getMovies()
  }


  getMovies(){
    if(this.noMoreData){
      return;
    }
    this.loading=true;
    this.movieService.getMovies(this.batch).subscribe(
      (result: Movie[]) => {
        this.movies.push(...result);
        this.loading=false;
        this.batch++;
      },(error)=>{
        
         this.loading=false;
        if(error.status== 400){
           this.noMoreData=true;
           return;
        } 
        this.router.navigate(['/server-error']);
      });
     
  }
@HostListener('window:scroll', [])
onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    if (scrollPosition + windowHeight + 5 >= documentHeight &&  !this.loading) {
      this.getMovies()
          
    }
}

}
