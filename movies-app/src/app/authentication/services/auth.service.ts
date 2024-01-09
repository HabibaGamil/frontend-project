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
  private user :boolean = false;
 // private users : User[] = data;

  constructor(private http: HttpClient) { 
   // console.log(this.users)
  }
  ngOnInit(){
    console.log("auth service init")
  }
  getUser(): boolean{
     return this.user;
  }

  login(userData: User): Observable<boolean> {
    this.user=true;
    return of(true).pipe(
      tap(
        ()=>{
          this.user=true;
          this.authSubject.next(true)}));


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
