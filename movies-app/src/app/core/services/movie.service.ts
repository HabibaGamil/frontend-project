import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../movie';



@Injectable({
  providedIn: 'root'
})
export class MovieService {


  private url : string = environment.apiURL ;
  headers: HttpHeaders = new HttpHeaders ({'Authorization': 'bearer ' +environment.apiToken})
 


  movieSubject : Subject<Movie[]> = new Subject<Movie[]>();


  constructor( private http: HttpClient) { }


  getMovies(batch:number): Observable<any> {

    var params: HttpParams =new HttpParams().set('page', batch)
     var url = environment.backend.pageURL               
                    
    return this.http.get<any>(url, {params: params})
           .pipe(
            map(response => {
              var movies: Movie[] = response.data;
              return movies  
                 })             
            );
      }
    getMovie(id: string): Observable<any> {
      
      var url  = environment.backend.movieURl;           
      return this.http.get<any>(url+id)
      .pipe(
       map(response => {      
        var movie :Movie=response.data[0];       
        return movie  
       })             
       );

    }
}

