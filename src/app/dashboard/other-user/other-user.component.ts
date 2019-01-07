import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SignalRService } from 'src/app/service/signal-r.service';
import { AuthService } from 'src/app/service/auth.service';
import { AppConst } from 'src/app/appConst';
import * as signalR from "@aspnet/signalr";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { debug } from 'util';
@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css'],
})
export class OtherUserComponent implements OnInit {

  topCoins = [];

  animationTopStyle: any = {};

  setAnimationSubject = new Subject();

  constructor(private otherUserService: UserService, private authService: AuthService, private renderer: Renderer2,private messService:MessageService) {
    this.setAnimationSubject.pipe(debounceTime(100)).subscribe(res => {
      var topBarEle = document.getElementById("top-bar");
      this.animationTopStyle.width = ((topBarEle.clientWidth + 1) * 3) + "px";
    });
   }

  users = [{ id: '', userName: '', sexType: 0, country: '', hobbies: '', status: 0 }];

  blackListUsers = [{ id: '', userName: '', sexType: 0, country: '', hobbies: '', status: 0 }];

  otherUser = { userName: '', email: '', avatar: '', sexType: 0, country: '', note: '', phoneNumber: '', status: 0 };

  searchFe='';
  searchBe='';
  pageLength = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  temps;
  displayedColumns:string[] = ['index','userName', 'sexType', 'country','hobbies'];
 
  initTable(): any {
    this.otherUserService.getOtherUserProfile('',1, 10).subscribe(res => {
      if (res.isSuccess) {
        this.temps = res.value.data;
        this.pageLength = res.value.totalItem;
        this.pageIndex = res.value.pageIndex;
        this.users=this.temps;
      } else {
        alert(res.errors);
      }
    }, err => {
      alert(err);
    });
  }
  pageEvent(event) {
    console.log(event);
    this.loadData(this.searchBe,event.pageIndex+1,event.pageSize);
  }
  loadData(search,pageSize,pageIndex){
    this.otherUserService.getOtherUserProfile(search,pageSize, pageIndex).subscribe(res => {
      if (res.isSuccess) {
        this.users = res.value.data;
        this.pageLength = res.value.totalItem;
        this.pageIndex = res.value.pageIndex;
      } else {
        alert(res.errors);
      }
    }, err => {
      alert(err);
    });
  }
  searchFE(even){
    console.log(even);
    this.users= this.temps.filter(x=>x.userName.includes(even.target.value));
  }
  searchBE(even){
    console.log(even);
    this.searchBe=even.target.value;
    this.loadData(this.searchBe,1,10);
  }
  applyFilter(filterValue: string) {
    this.users= this.temps.filter(x=>x.userName.includes(filterValue));
  }




  chatPopup = false;
  dataSource = new MatTableDataSource<any>(this.users);
  options = { skipNegotiation: true, logger: signalR.LogLevel.Trace, transport: signalR.HttpTransportType.WebSockets };//,};
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/hub/", this.options)
    .build();

  message = '';
  username = this.authService.getLocalStorage(AppConst.userStoge);
  columnsToDisplay = ['userName', 'country','hobby'];
  div: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;






  userChat = '';
  chat(user) {
    debugger;
    if(this.chatPopup==false)
      this.chatPopup = !this.chatPopup;
    if (user == this.userChat && this.chatPopup==true)
    {  
      this.chatPopup = !this.chatPopup;
    }
    this.userChat = user;


    this.messService.getMessage(user).subscribe(res=>{
      if(!res.isSuccess){
        alert(res.errors);
      }else{
        //init message history popup
        this.div = this.renderer.selectRootElement('#messageHistory');
        let init = this.renderer.createElement('span');
        this.renderer.appendChild(this.div, init);

        //load message history
       res.value.forEach(e => {
        let h6 = this.renderer.createElement('h6');
        const user = this.renderer.createText(e.fromUser);
        this.div = this.renderer.selectRootElement('#messageHistory', true);
  
  
        let p = this.renderer.createElement('p');
        const text = this.renderer.createText(e.content);
  
        this.renderer.appendChild(h6, user);
        this.renderer.appendChild(p, text);
        if (e.fromUser == this.username) {
          this.renderer.addClass(p, 'userMessage');
  
          this.renderer.addClass(h6, 'userMessage');
        }
        this.renderer.appendChild(this.div, h6);
        this.renderer.appendChild(this.div, p);
       });
      }
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.otherUser = null;
    this.blackListUsers = null;
    this.initTable();



    //signalR
    this.connection.start().catch(err => {
      alert(err);
      document.write(err)
    });

    this.connection.on("privateMessageReceived", (fromUser: string, toUser: string, message: string) => {
      this.userChat=fromUser;
      if (toUser == this.username || fromUser == this.username)
        this.chatPopup = true;
      let h6 = this.renderer.createElement('h6');
      const user = this.renderer.createText(fromUser);
      this.div = this.renderer.selectRootElement('#messageHistory', true);


      let p = this.renderer.createElement('p');
      const text = this.renderer.createText(message);

      this.renderer.appendChild(h6, user);
      this.renderer.appendChild(p, text);
      if (fromUser == this.username) {
        this.renderer.addClass(p, 'userMessage');

        this.renderer.addClass(h6, 'userMessage');
      }
      this.renderer.appendChild(this.div, h6);
      this.renderer.appendChild(this.div, p);
    });

    this.connection.on("messageReceived", (username: string, message: string) => {
     
        // alert(username+message);
    });



    this.connection.on("adminSendMessage", (message: string) => {

      let p = this.renderer.createElement('p');

      const text = this.renderer.createText("SYSTEM : " + message);

      this.div = this.renderer.selectRootElement('#messageSystem');


      this.renderer.appendChild(p, text);

      this.renderer.appendChild(this.div, p);
    });


    this.getUsers();
    setTimeout(() => {
      this.connection.send("newMessage", this.username, this.message)
      .then(() => console.log('ok'));
    }, 500);
  }
  getUsers(): any {
    this.otherUserService.getOtherUserProfile('',1,10).subscribe(res => {
      if (!res.isSuccess) {
        alert(res.errors);
      }
      else {
        this.users = res.value.data;
      }
    },
      err => {
        alert(err);
      })
  }


  actionUser(action, id) {
    this.otherUserService.actionUser(action, id).subscribe(res => {
      if (!res.isSuccess) {
        alert(res.errors);
      }
      else {
        this.detail(id);
      }
    },
      err => {
        alert(err);
      })
  }

  detail(id): any {
    this.otherUserService.getUserById(id).subscribe(res => {
      if (!res.isSuccess) {
        alert(res.errors);
      }
      else {
        this.otherUser = res.value;
      }
    },
      err => {
        alert(err);
      })
  }
  close() {
    this.otherUser = null;
  }

  getBlackList() {
    this.otherUserService.getBlackList().subscribe(res => {
      if (!res.isSuccess) {
        alert(res.errors);
      }
      else {
        this.blackListUsers = res.value;
      }
    },
      err => {
        alert(err);
      })
  }





  send() {
    debugger;
    if (this.message != '')
      this.connection.send("privateMessage", this.username, this.userChat, this.message)
        .then(() => {
          
          console.log('ok');
        this.chatPopup = true;
      let h6 = this.renderer.createElement('h6');
      
      const user = this.renderer.createText(this.username);
      this.div = this.renderer.selectRootElement('#messageHistory', true);


      let p = this.renderer.createElement('p');
      const text = this.renderer.createText(this.message);

      this.renderer.appendChild(h6, user);
      this.renderer.appendChild(p, text);

        this.renderer.addClass(p, 'userMessage');
        this.renderer.addClass(h6, 'userMessage');

      this.renderer.appendChild(this.div, h6);
      this.renderer.appendChild(this.div, p);
      this.message = '';
    });
   
  }

}
