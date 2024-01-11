import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$: Observable<boolean> = this.authSubject.asObservable();

  private redirectURL: string = '/explore'

  constructor(private http: HttpClient) { 
    this.isLoggedIn();
  }

  isLoggedIn():boolean{ 
    if(localStorage.getItem('uid')){
      this.authSubject.next(true);
      return true;
    }
    return false; 
  }
  getRedirectURL(){
    return this.redirectURL;
  }
  setRedirectURL(url:string){
    this.redirectURL=url;
  }
  login(userData: User): Observable<any> {

    var url :string = environment.firebase.signInURL;
    
    return this.http.post<any>(url,
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true

      }).pipe(
       tap((data)=>{
         console.log(data)
         localStorage.setItem('uid',data.uid);
         this.authSubject.next(true)
      })     
    );
  }
  logout(){
    localStorage.removeItem('uid');
    this.authSubject.next(false)
  }
}
