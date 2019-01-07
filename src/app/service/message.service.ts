import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }
  apiUrl=environment.apiUrl;
  getMessage(withUser){
    return this.http.get<ApplicationResults>(this.apiUrl+'Message/GetAllMessageWithUser?withUser='+withUser);
  }


}
