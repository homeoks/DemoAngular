import { Component, OnInit, Renderer2 } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { AuthService } from 'src/app/service/auth.service';
import { AppConst } from 'src/app/appConst';
@Component({
  selector: 'app-signal-r',
  templateUrl: './signal-r.component.html',
  styleUrls: ['./signal-r.component.css']
})
export class SignalRComponent implements OnInit {
  options = { skipNegotiation:true, logger: signalR.LogLevel.Trace, transport: signalR.HttpTransportType.WebSockets };//,};
  connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5001/hub/",this.options)
  .build();

  message='';
  username=this.authService.getLocalStorage(AppConst.userStoge);
  connecting=false;
  constructor(private authService:AuthService,private renderer:Renderer2) { }
  div:any;
  ngOnInit() {
    if(this.connecting==false)
    this.connection.start().catch(err => {
      alert(err);
      document.write(err)}).then(res=>{
      if(this.connection!=null)
        this.connecting=true;
    }).finally(function(){
      debugger;
        console.log(this.connection);
    });


      
    this.connection.on("messageReceived", (username: string, message: string) => {
      let h6=this.renderer.createElement('h6');
      const user = this.renderer.createText(username);
      this.div=this.renderer.selectRootElement('#messageHistory',true);
      

      let p=this.renderer.createElement('p');
      const text = this.renderer.createText(message);

      this.renderer.appendChild(h6, user);
      this.renderer.appendChild(p, text);
      if(username==this.username)
          {
            this.renderer.addClass(p,'userMessage');

            this.renderer.addClass(h6,'userMessage');
          }
          this.renderer.appendChild(this.div,h6);
          this.renderer.appendChild(this.div,p);
     
        });

  }
  
  send() {
    debugger;
    if(this.message!='')
    this.connection.send("newMessage", this.username, this.message)
              .then(() => console.log('ok'));
    this.message='';
  }
  
}