import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
 
  constructor(private http:HttpClient) { }
  apiUrl=environment.apiUrl;
  getHobbies(pageIndex,pageSize){
    return this.http.get<ApplicationResults>(this.apiUrl+'Hobby/GetHobbies?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  addNewHobby(model){
    return this.http.post<ApplicationResults>(this.apiUrl+"Hobby/AddNewHobby",model);
  }
}
