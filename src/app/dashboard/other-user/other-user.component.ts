import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  constructor(private otherUserService:UserService) { }

  users=[{id:'',userName:'',sexType:0,country:'',hobbies:''}];
  otherUser={userName:'',email:'',avatar:'',sexType:0,country:'',note:'',phoneNumber:''};
  ngOnInit() {
    this.getUsers();
    this.otherUser=null;
  }
  getUsers(): any {
    this.otherUserService.getOtherUserProfile().subscribe(res=>{
      if(!res.isSuccess){
        alert(res.errors);
      }
      else
      {
        this.users=res.value;
      }
    },
    err=>{
      alert(err);
    })
  }
  detail(id): any {
    this.otherUserService.getUserById(id).subscribe(res=>{
      if(!res.isSuccess){
        alert(res.errors);
      }
      else
      {
        this.otherUser=res.value;
      }
    },
    err=>{
      alert(err);
    })
  }
  close(){
    this.otherUser=null;
  }
}
