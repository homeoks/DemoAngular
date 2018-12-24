import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clearToken(): any {
    window.localStorage.clear();
  }
    logout(): any {
      this.clearToken();
      this.router.navigate(['/login']);
    }

  constructor(private http:HttpClient,private router:Router) { }
  apiUrl=environment.authUrl;

  login(model){
    return this.http.post<any>(this.apiUrl,model);
  }
  register(model){
    return this.http.post<any>(this.apiUrl,model);
  }
  setLocalStorage(key,value){
    window.localStorage.setItem(key,value);
  }
  getLocalStorage(key){
    return window.localStorage.getItem(key);
  }
}
