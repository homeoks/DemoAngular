import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { ApplicationResults } from '../appResult';
import { Router } from '@angular/router';
import { AppConst } from '../appConst';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginModel={username:'',password:'',grant_type:'password'};

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.authService.clearToken();
  }
  login(){
    var model=this.loginModel;
    this.authService.login(model).subscribe((res:ApplicationResults)=>{
      if(res.isSuccess)
        {
          this.authService.setLocalStorage(AppConst.accessToken,res.value.access_token);
          this.authService.setLocalStorage(AppConst.refreshToken,res.value.refresh_token);
          this.authService.setLocalStorage(AppConst.userStoge,this.loginModel.username);
          this.router.navigate(['/dashboard']);
        }
        else{
          alert(res.errors);
        }
    })
  }
}
