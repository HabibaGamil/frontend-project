import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../../user';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$: Observable<boolean> = this.authSubject.asObservable();

  private redirectURL: string = '/explore'

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    
  }
  getRedirectURL(){
    return this.redirectURL;
  }
  setRedirectURL(url:string){
    this.redirectURL=url;
  }

  isAuthenticated(): Observable<any>|null{ 
    var url :string = environment.backend.refreshURL;
    const refreshToken = this.cookieService.get('refresh_token');
    if(refreshToken==null){
      return null;
    }
      
    return this.http.post<any>(url,
       {
        'refreshToken': refreshToken
       })
       .pipe(
       tap((data)=>{
        this.setLocalStorage(data.access_token,data.refresh_token);
        this.authSubject.next(true);   
      })    
    );

  }

  login(userData: User): Observable<any> {

    var url :string = environment.backend.loginURL;
    
    return this.http.post<any>(url,
      {
        email: userData.email,
        password: userData.password,

      }).pipe(
       tap((data)=>{  
        this.setLocalStorage(data.access_token,data.refresh_token)
         this.authSubject.next(true)
      })     
    );
  }

  signup (userData: User): Observable<any> {

    var url = environment.backend.signupURL;

    return this.http.post<any>(url,
      {
        name:userData.username,
        password:userData.password ,
        matchingPassword:userData.password,
        email: userData.email
    }).pipe(
       tap((data)=>{
        this.setLocalStorage(data.access_token,data.refresh_token)
        this.authSubject.next(true)       
      })     
    );
  }
  setLocalStorage(accessToken:string,refreshToken:string){
    localStorage.setItem('access_token',accessToken);
    this.cookieService.set('refresh_token', refreshToken);
  }

  tokenExpired(){
    this.authSubject.next(false)
  }

  logout():Observable<any>|null{
    const refreshToken: string = this.cookieService.get('refresh_token');
    if(refreshToken==null){
      return null;
    }

    const url = environment.backend.logoutURL;
    return this.http.post<any>(url,
      {
        'refreshToken': refreshToken
      }).pipe(
       tap(()=>{
        localStorage.removeItem('access_token');
        this.cookieService.deleteAll()
        this.authSubject.next(false)      
      })     
    );

 
  }
}
