import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService) { }
  userProfile={userName:'',email:'',avatar:'',sexType:0,country:'',note:'',phoneNumber:''};
  ngOnInit() {
    this.loadUserProfile();
  }

  selectedFile: File;
  
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    }
  
   
  loadUserProfile(): any {
    this.userService.getUserProfile().subscribe(res=>{
    
      if(!res.isSuccess)
      {
        alert(res.errors);
      }
      else
      {
        this.userProfile=res.value;
      }
    },
    err=>{
      alert(err);
    });
  }

  

  upload(){
    debugger;
    this.userService.upload(this.selectedFile).subscribe(res=>{
      if(!res.isSuccess)
      {
        alert(res.errors);
      }
      else
      {
        this.userProfile=res.value;
      }
    });
  }
}
