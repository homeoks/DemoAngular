import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  options = { skipNegotiation:true, logger: signalR.LogLevel.Trace, transport: signalR.HttpTransportType.WebSockets };//,};
  connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/hub/",this.options)
  .build();

  constructor() {
    this.onInit();
   }
  
  onInit() {
    this.connection.start().catch(err => {
      alert(err);
      document.write(err)});
    this.connection.on("messageReceived", (username: string, message: string) => {
      return {username:username,message:message};
   });

  }
  
  send(userName,message) {
    this.connection.send("newMessage", userName, message)
              .then(() => console.log('ok'));
  }
}

