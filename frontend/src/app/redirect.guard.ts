import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  userId: string = '';
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn() === true) {
      this.userId = this.authService.getUserId();
      this.authService.getUserProfile().subscribe((userData: any) => {
          // Redirect to profile page
          if(userData.data.role === "admin") {
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['profile', this.userId]);
          }
      });
    }
    return true;
  }
  
}
