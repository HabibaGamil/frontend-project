import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth/auth.service';
import { Movie } from '../../movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

 
  movie: Movie ={
    id : '',
    title : '',
    description: '',
    posterPath: '',
    backdropPath: '',
    voteAverage: '',
    voteCount: '',
    releaseDate: ''
  };
  arFlag = false;
  loading = false;
  id: string='';

  constructor( private movieService: MovieService, 
               private route: ActivatedRoute, 
               private router: Router,
               private authService: AuthService){
    
  }

  ngOnInit(){
     this.getId() 
     this.loading=true;
     this.getMovie(this.id);
  
  }
  getId(){
    this.id = this.route.snapshot.params['id']
  }

  getMovie(id:string){
    this.movieService.getMovie(id)
    .subscribe((data)=> {
      console.log(data)
      this.movie=data;
      this.loading=false;
    },
    (error)=>{
    
      if(error.status==403){
        this.authService.tokenExpired();
        this.router.navigate(['/login'])
      }
      //else movie not found
    })
  }

}
