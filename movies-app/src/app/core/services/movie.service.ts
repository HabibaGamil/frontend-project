import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../movie';
import { AppSettingsService } from './app-settings.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url : string = environment.apiURL ;
  headers: HttpHeaders = new HttpHeaders ({'Authorization': 'bearer ' +environment.apiToken})


  movieSubject : Subject<Movie[]> = new Subject<Movie[]>();


  constructor( private http: HttpClient, private appSettings: AppSettingsService) { }


  getMovies(batch:number): Observable<any> {
    var params: HttpParams =new HttpParams()
                           .set('page', batch)
                           .set('sort_by',environment.sortBy)
                    
    if(this.appSettings.getLanguage()=='ar'){
       params= params.set("language","ar-SA")
    } 
    return this.http.get<{ [propKey: string]: Object }>(this.url+'discover/movie', {headers : this.headers, params: params})
           .pipe(
            map(data => {
              var movies: Movie[] = [];
              console.log(data["results"])
              Object.values(data["results"])
              .forEach((obj)=> {
                movies.push({ 
                    id : obj["id"],
                    title: obj["title"],
                    description: obj["overview"],
                    posterPath: obj["poster_path"],
                    backdropPath:  obj["backdrop_path"],
                    voteAverage : obj["vote_average"],
                    releaseDate : obj["release_date"]
                  })})            
                  return movies    
                 })             
            );
      }
    getMovie(id: number): Observable<any> {

      var params: HttpParams =new HttpParams()
      if(this.appSettings.getLanguage()=='ar'){
        params= params.set("language","ar-SA")
     }                       
      return this.http.get<{ [propKey: string]: string }>(this.url+'movie/'+id, {headers : this.headers, params: params})
      .pipe(
       map(data => {
        var movie: Movie = { 
            id : data["id"],
            title: data["title"],
            description: data["overview"],
            posterPath: data["poster_path"],
            backdropPath:  data["backdrop_path"],
            voteAverage : data["vote_average"],
            releaseDate : data["release_date"]
          }       
        console.log(data)
        return movie   
           })             
       );

    }
}
