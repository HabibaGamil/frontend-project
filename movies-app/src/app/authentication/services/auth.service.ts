import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../user';
import * as data  from '../users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<boolean>(false);
  private dataUrl = '../users.json'; 
  private users : User[] = data;

  constructor(private http: HttpClient) { 
    console.log("I was here")
    console.log(this.users)
  }

  login(userData: User): Observable<boolean> {

    return of(true).pipe(tap(()=>{this.authSubject.next(true)}));

    var foundUser: boolean = false;

    return this.http.get<User[]>(this.dataUrl).pipe(
      map((users)=>{
        console.log(users)
        for (let i = 0; i < users.length; i++) {
          console.log(users[i]);
          if(users[i].email==userData.email && users[i].password==userData.password){
            foundUser=true;
            return true;
          }
        }
        return false;
      }),
      tap(()=>{
         this.authSubject.next(foundUser)
      })
      
    );
  }
}
