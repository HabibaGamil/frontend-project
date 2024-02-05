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
      this.movie=data;
      this.loading=false;
    },
    (error)=>{
      console.log(error.status)
      if(error.status== 403){
        this.authService.accessTokenExpired();
        const url = this.route.snapshot.url.join('/');
        this.authService.setRedirectURL("discover/"+url)
        this.router.navigate(['auth/login'])
        return;
      }
      if(error.status==0){
        this.router.navigate(['/server-error'])
        return;
      }
      
      this.router.navigate(['/page-not-found'])
    })
  }

}
