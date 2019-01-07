import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { SignalRService } from '../service/signal-r.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService,private signalR:SignalRService) { }
  userProfile={userName:'',email:'',avatar:'',sexType:0,country:'',note:'',phoneNumber:'',status:'0'};
  editProfile={email:'',avatar:'',sexType:0,country:'',note:'',phoneNumber:'',status:'0',userName:''};
  ngOnInit() {
    this.loadUserProfile();
  }
  
  countries=[{name:''}];
  selectedFile: File;
  
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    }
  
    edit=true;
   
  loadUserProfile(): any {
    this.userService.getUserProfile().pipe().subscribe(res=>{
    
      if(!res.isSuccess)
      {
      }
      else
      {
        this.userProfile=res.value;
      }
    },
    err=>{
    });
  }
  clickEvent(){
     if(this.edit)
    this.loadCountries();
    this.edit = !this.edit;
    if(this.edit==false){
      debugger;
     this.loadUserProfile();
     this.editProfile=this.userProfile;
    }
  }
  get statusClass() {
    if(this.userProfile.status=='Online')
    return {
      online: 'online'
    }
    if(this.userProfile.status=='Offline')
    return {
      offline: 'offline'
    }
    if(this.userProfile.status=='Busy')
    return {
      busy: 'busy'
    }
    return 'afk';
  }
  editUserProfile(){
    debugger;
    this.userService.postEditUserProfile(this.editProfile).subscribe(res=>{
      if(!res.isSuccess)
      {
        debugger;
        alert(res.errors);
      }
      else
      {
        debugger;
        this.loadUserProfile();
        this.clickEvent();
      }
    },
    err=>{
      alert(err);
    })
  }
  loadCountries(): any {
    debugger;
    this.userService.getCountries().subscribe(res=>{
      if(!res.isSuccess)
      {
        alert(res.errors);
      }
      else
      {
        debugger;
        this.countries=res.value;
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
