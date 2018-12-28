import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-user-paging',
  templateUrl: './user-paging.component.html',
  styleUrls: ['./user-paging.component.css']
})
export class UserPagingComponent implements OnInit {

  constructor(private userService: UserService) { }

  searchFe='';
  searchBe='';
  pageLength = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  users = [{ id: '', userName: '', sexType: 0, country: '', hobbies: '', status: 0 }];
  temps;
  displayedColumns:string[] = ['userName', 'sexType', 'country','hobbies'];
  ngOnInit() {
    this.initTable();
  }
  initTable(): any {
    this.userService.getOtherUserProfile('',1, 10).subscribe(res => {
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
    this.userService.getOtherUserProfile(search,pageSize, pageIndex).subscribe(res => {
      if (res.isSuccess) {
        this.users = res.value.data;
        this.pageLength = res.value.totalItem;
        this.pageIndex = res.value.pageIndex;
        this.pageSize=pageSize;
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
    this.loadData(this.searchBe,this.pageIndex,this.pageSize);
  }
  applyFilter(filterValue: string) {
    this.users= this.temps.filter(x=>x.userName.includes(filterValue));
  }
}
