import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  const API_URI: string = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${API_URI}/auth/register`, user, httpOptions)
  }

  login(user: any): Observable<any> {
    return this.httpClient.post<any>(`${API_URI}/auth/login`, user, httpOptions)
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if(localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login']);
    }
  }

  checkLogin(id: any) {
    if(this.isLoggedIn()) {
      this.router.navigate(['profile', id]);
    }
  }

  getUserId() {
    let authToken = localStorage.getItem('access_token');
    let payload, user:any;
    if(authToken) {
      // Get payload from token
      payload = authToken.split('.')[1];
      payload = window.atob(payload);
      user = JSON.parse(payload);
    }
    return user.id;
  }

  redirectToProfile(res: any) {
    const token = res.token;
    let userId:string = '';
    if (token && res.success) {
      // Set token into local storage
      localStorage.setItem('access_token', res.token)

      // Get user
      userId = this.getUserId();

      // Get user details
      if(this.isLoggedIn()) {
        this.getUserProfile().subscribe((userData: any) => {
          // Redirect to profile page
          if(userData.data.role === "admin") {
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['profile/' + userId]);
          }
        });
      }
    }
  }

  getUserProfile(): Observable<any> {
    return this.httpClient.get<User>(`${API_URI}/auth/me`)
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
