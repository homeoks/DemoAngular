import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeviceComponent } from './device/device.component';
import { HobbyComponent } from './hobby/hobby.component';
import { OtherUserComponent } from './other-user/other-user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DeviceComponent,
    HobbyComponent,
    OtherUserComponent,
  ],
  imports: [
    CommonModule,
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
     }
     ,
     {
       path:'otherUser',
       component:OtherUserComponent
     }
    ]),
    FormsModule
  ],
  entryComponents: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
