import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  upload(model): any {
    return this.http.post<ApplicationResults>(this.apiUrl+"User/UploadFile",model);
  }
  getCountries(): any {
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetCountries");
  }

  constructor(private http:HttpClient) { }

  apiUrl=environment.apiUrl;

  getUserProfile(){
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetUserProfile");
  }
  
  getOtherUserProfile(){
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetOtherUserProfile");
  }
  
  getUserById(id){
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetUserById"+"?id="+id);
  }
}