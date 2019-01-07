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
  pageLength = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  displayedColumns:string[] = ['index','name', 'hobbyType', 'description'];


  ngOnInit() {
    this.getHobbies();
  }
  getHobbies(): any {
    debugger;
    this.loadData(this.pageIndex,this.pageSize);
  }
  pageEvent(event) {
    console.log(event);
    this.loadData(event.pageIndex+1,event.pageSize);
  }
  loadData(pageIndex,pageSize){
    debugger;
   var t= this.hobbyService.getHobbies(pageIndex,pageSize).subscribe(res=>{
      if (res.isSuccess) {
        this.hobbies = res.value.data;
        this.pageLength = res.value.totalItem;
        this.pageIndex = res.value.pageIndex;
      } else {
        alert(res.errors);
      }
    }, err => {
    });
  }
  addNewHobby(){
    debugger;
    this.hobbyService.addNewHobby(this.newHobby).subscribe(res=>{
      if(res.isSuccess){
        this.loadData(this.pageIndex,this.pageSize);
        this.clickEvent();
      }else{
        alert(res.errors);
      }
    },
    err=>{
    })
  }
  
  //toggle show off insert form
  show= false;
clickEvent(){
    this.show = !this.show;       
}

}
