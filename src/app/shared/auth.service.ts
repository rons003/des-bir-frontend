import { Injectable } from '@angular/core';
import { Service } from '../core/api.client.generated';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: Service
  ) { }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUserBIR') || '{}');
  }

  getUserType(): string {
    return this.getCurrentUser();
  }

  getToken(): string {
    return this.getCurrentUser().auth_token;
  }

  getDB(): string {
    return this.getCurrentUser().branchDB;
  }

  getUserName(): string {
    return this.getCurrentUser().userName;
  }

  getPassword(): string {
    return this.getCurrentUser().password;
  }

  isLoggedIn(): boolean {
    const data = this.getCurrentUser();
    return data && data.auth_token;
  }

  logout() {
    localStorage.removeItem('currentUserBIR');
    // remove user from local storage to log user out
  }
}
