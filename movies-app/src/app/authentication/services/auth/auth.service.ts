import { HttpClient, HttpHeaders } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../../user';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject :BehaviorSubject<boolean> ;
  isAuthenticated$: Observable<boolean> ;

  private redirectURL: string = '/discover'

  constructor(private http: HttpClient) { 
     var isLoggedIn : boolean = (localStorage.getItem("logged_in")=="1") ? true : false;
     this.authSubject =  new BehaviorSubject<boolean>(isLoggedIn);
     this.isAuthenticated$ = this.authSubject.asObservable();

  }
  
  getRedirectURL(){
    return this.redirectURL;
  }
  setRedirectURL(url:string){
    this.redirectURL=url;
  }

  isAuthenticated(): Observable<any>|null{ 
    var url :string = environment.backend.refreshURL;
    const refreshToken = localStorage.getItem("refresh_token");
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
      },()=>{
        this.accessTokenExpired()
        this.refreshTokenExpired();
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
    localStorage.setItem('refresh_token',refreshToken);
    localStorage.setItem('logged_in',"1")
  }

  accessTokenExpired(){
    this.authSubject.next(false);
    localStorage.removeItem("access_token")
    localStorage.setItem('logged_in',"0")
  }
  refreshTokenExpired(){
    localStorage.removeItem("refresh_token")
  }

  logout():Observable<any>|null{
    const refreshToken = localStorage.getItem("refresh_token");
    if(refreshToken==null){
      return null;
    }
    const url = environment.backend.logoutURL;
    return this.http.post<any>(url,
      {
        'refreshToken': refreshToken
      }).pipe(
       tap(()=>{   
        this.authSubject.next(false)    
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.setItem('logged_in',"0")
      })     
    );

 
  }
}
