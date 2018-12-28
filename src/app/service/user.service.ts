import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getBlackList(): any {
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetBlackList");
  }
  actionUser(action: any, userId: any): any {
    debugger;

    var data = {
      action:action,
      userId:userId
    };
    let _body = JSON.stringify(data);
    const myheader = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
    return this.http.post<ApplicationResults>(this.apiUrl+"User/ActionUser?action="+action+"&userId="+userId,{
      HttpHeaders:myheader
    });
  }
  postEditUserProfile(model): any {
    return this.http.post<ApplicationResults>(this.apiUrl+"User/UpdateUserProfile",model);
  }
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
  
  getOtherUserProfile(search,pageIndex,pageSize){
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetOtherUserProfile"+ "?search="+search+"&pageIndex=" + pageIndex + "&pageSize=" + pageSize);
  }
  
  getUserById(id){
    return this.http.get<ApplicationResults>(this.apiUrl+"User/GetUserById"+"?id="+id);
  }
}