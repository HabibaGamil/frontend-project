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
  private user :boolean = false;


  constructor(private http: HttpClient) { }
  ngOnInit(){
    console.log("auth service init")
  }
  getUser(): boolean{
     return this.user;
  }

  login(userData: User): Observable<any> {

    return this.http.post(environment.firebase.signInURL,
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true

      }).pipe(
      map((data)=>{
        return data;             
      }),
      tap((data)=>{
         console.log(data)
         this.user=true;
         this.authSubject.next(true)
      })     
    );
  }
}
