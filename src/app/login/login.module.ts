import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
     {
      path:'',
      component:LoginComponent,
     },
     {
       path:'dashboard',
       loadChildren:'../dashboard/dashboard.module#DashboardModule'
     }
    ]),
    FormsModule,
  ],
  entryComponents: [
    LoginComponent,
  ]
})
export class LoginModule { }
