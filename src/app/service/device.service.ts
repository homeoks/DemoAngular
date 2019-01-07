import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationResults } from '../appResult';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  deleteDevice(id): any {
    debugger;
    return this.http.post<ApplicationResults>(this.apiUrl+"Device/DeleteDevice"+"?id="+id,id);
  }
  apiUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  getDevices(pageSize,pageIndex){
    return this.http.get<ApplicationResults>(this.apiUrl+"Device/GetDevices?pageSize="+pageSize+"&pageIndex="+pageIndex);
  }
  addNewDevices(model){
    return this.http.post<ApplicationResults>(this.apiUrl+"Device/AddNewDevice",model);
  }
}
