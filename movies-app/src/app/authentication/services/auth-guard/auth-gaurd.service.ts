import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {take, map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    
        return this.authService.isAuthenticated$.pipe(
          take(1), // Take only the first value
          map(isAuthenticated => {
            if (isAuthenticated) {
              return true;
            }
            var urlSegments = route.url;
            var url : string = urlSegments.map(segment => segment.path).join('/');
            this.authService.setRedirectURL(url)
            return this.router.createUrlTree(['/login']);  
          })
        );     
}
}
