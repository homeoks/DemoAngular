import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConst } from '../appConst';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   refreshToken(model) {
      return  this.http.post<ApplicationResults>(this.apiUrl, model).pipe(map(res => {
        if (res.isSuccess && res.value.access_token) {
          debugger;
          this.setLocalStorage(AppConst.accessToken,res.value.access_token);
          this.setLocalStorage(AppConst.refreshToken,res.value.refresh_token);
        }
        else{
          this.logout();
        }
    }), catchError(err => {
        return this.logout();
    }));
    }
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
