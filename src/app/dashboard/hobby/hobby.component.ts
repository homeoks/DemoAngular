import { Component, OnInit, Input } from '@angular/core';
import { HobbyService } from 'src/app/service/hobby.service';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  constructor(private hobbyService:HobbyService) { }
@Input() newHobby={name:'',hobbyType:0,description:''};
  hobbies=[{name:'',hobbyType:0,description:''}]
  ngOnInit() {
    this.getHobbies();
  }
  getHobbies(): any {
    this.hobbyService.getHobbies().subscribe(res=>{
      if(res.isSuccess){
        this.hobbies=res.value;
      }else{
        alert(res.errors);
      }
    })
  }
  addNewHobby(){
    debugger;
    this.hobbyService.addNewHobby(this.newHobby).subscribe(res=>{
      if(res.isSuccess){
        this.getHobbies();
        this.clickEvent();
      }else{
        alert(res.errors);
      }
    },
    err=>{
      debugger;
      alert(err);
    })
  }
  
  //toggle show off insert form
  show= false;
clickEvent(){
    this.show = !this.show;       
}

}
