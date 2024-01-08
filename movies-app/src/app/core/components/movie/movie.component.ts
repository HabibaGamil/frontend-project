import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../movie';
import { AppSettingsService } from '../../services/app-settings.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

  @Input()
  movie! : Movie;
  arFlag = false;

  constructor( private movieService: MovieService, private route: ActivatedRoute, private appSettings: AppSettingsService){}

  ngOnInit(){
     var id :number = this.route.snapshot.params['id']
     this.getMovie(id);
     
     this.appSettings.languageSubject
     .subscribe((lang)=>{ 
      if (lang=='ar'){
        this.arFlag=true;
      }else {
        this.arFlag=false;
      }
      this.getMovie(id);
      })
  }
  getMovie(id:number){
    this.movieService.getMovie(id).subscribe((data)=> this.movie=data )
  }

}
