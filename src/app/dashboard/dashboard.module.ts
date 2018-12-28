import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeviceComponent } from './device/device.component';
import { HobbyComponent } from './hobby/hobby.component';
import { OtherUserComponent } from './other-user/other-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SignalRComponent } from './signal-r/signal-r.component';
import {
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { UserPagingComponent } from './user-paging/user-paging.component';
import { TestMatTableComponent } from './test-mat-table/test-mat-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DeviceComponent,
    HobbyComponent,
    OtherUserComponent,
    EditUserComponent,
    SignalRComponent,
    UserPagingComponent,
    TestMatTableComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild([
     {
      path:'',
      component:DashboardComponent,
     },
     {
       path:'device',
       component:DeviceComponent
     },
     {
       path:'hobby',
       component:HobbyComponent
     },
     {
       path:'edit',
       component:EditUserComponent
     }
     ,
     {
       path:'otherUser',
       component:OtherUserComponent
     },
     {
       path:'signalR',
       component:SignalRComponent
     },
     {
       path:'paging',
       component:UserPagingComponent
     },
     {
       path:'matTable',
       component:TestMatTableComponent
     }
    ]),
    FormsModule,
  ],
  exports:[],
  entryComponents: [
    DashboardComponent,
    TestMatTableComponent
  ]
})
export class DashboardModule { }
