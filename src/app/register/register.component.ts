import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ApplicationResults } from '../appResult';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() registerModel={
    username:'',email:'',password:'',confirmPassword:'',phone:'',country:'',fullname:'',avatar:'',note:'',sex:'',grant_type:'signUp'
  };
  countries=[{name:''}];
  constructor(private authService:AuthService,private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.loadCountries();
  }
  loadCountries(): any {
    this.userService.getCountries().subscribe(res=>{
      if(!res.isSuccess)
      {
        alert(res.errors);
      }
      else
      {
        this.countries=res.value;
      }
    },
    err=>{
      alert(err);
    });
  }



  register(){
    debugger;
    if(this.registerModel.password!=this.registerModel.confirmPassword)
    {
      alert('confirm password invalid');
      return;
    }

    this.authService.register(this.registerModel).subscribe((res:ApplicationResults)=>{
      if(res.isSuccess){
        debugger;
        this.router.navigate(['/login']);
      }
      else
      {
        alert(res.errors);
      }
    })
  }
}
