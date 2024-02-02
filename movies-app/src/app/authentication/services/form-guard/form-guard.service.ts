import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {take, map, Observable,last } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ):
    |boolean 
    |UrlTree 
    |Observable<boolean
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> {

      return this.authService.isAuthenticated$.pipe(
        take(1),
        last(),
        map(isAuthenticated => {
          console.log("in form guard")
          console.log("is Authenticated " + isAuthenticated)
          if (!isAuthenticated) {
            return true;
          }
          var urlSegments = route.url;
          var url : string = urlSegments.map(segment => segment.path).join('/');
          this.authService.setRedirectURL(url)
          return this.router.createUrlTree(['/explore']);  
        })
      );     
  }
}
