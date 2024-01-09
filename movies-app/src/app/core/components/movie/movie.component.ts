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
  loading = false;
  id: string='';

  constructor( private movieService: MovieService, private route: ActivatedRoute, private appSettings: AppSettingsService){
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(){  
     this.loading=true;
     this.subscribeToLangSubject();
  }
  subscribeToLangSubject(){
    this.appSettings.languageSubject
    .subscribe((lang)=>{ 
     if (lang=='ar'){
       this.arFlag=true;
     }else {
       this.arFlag=false;
     }
     this.loading=true;
     this.getMovie(this.id);
     })
  }
  getMovie(id:string){
    this.movieService.getMovie(id)
    .subscribe((data)=> {
      this.movie=data;
      this.loading=false;
    })
  }

}
