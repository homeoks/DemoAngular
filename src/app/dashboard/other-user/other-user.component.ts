import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SignalRService } from 'src/app/service/signal-r.service';
import { AuthService } from 'src/app/service/auth.service';
import { AppConst } from 'src/app/appConst';
import * as signalR from "@aspnet/signalr";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  constructor(private otherUserService: UserService, private authService: AuthService, private renderer: Renderer2) { }

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
  displayedColumns:string[] = ['userName', 'sexType', 'country','hobbies'];
 
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
  chat(userId) {
    if (userId != null)
      this.userChat = userId;
    this.chatPopup = !this.chatPopup;
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
      debugger;
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
        debugger;
        this.users = res.value.data;
      }
    },
      err => {
        alert(err);
      })
  }


  actionUser(action, id) {
    debugger;

    this.otherUserService.actionUser(action, id).subscribe(res => {
      if (!res.isSuccess) {
        debugger;
        alert(res.errors);
      }
      else {
        debugger;
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
        .then(() => console.log('ok'));
    this.message = '';
  }

}
