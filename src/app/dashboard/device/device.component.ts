import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from 'src/app/service/device.service';
import { debug } from 'util';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private deviceService:DeviceService) { }
@Input() newDevice={name:'',type:0};
  devices=[{name:'',type:0,id:0}]


  pageLength = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  displayedColumns:string[] = ['index','name', 'type'];

  pageEvent(event) {
    console.log(event);
    this.loadData(event.pageSize,event.pageIndex+1);
  }
  loadData(pageSize,pageIndex){
    this.deviceService.getDevices(pageSize,pageIndex).subscribe(res=>{
      if (res.isSuccess) {
        this.devices = res.value.data;
        this.pageLength = res.value.totalItem;
        this.pageIndex = res.value.pageIndex;
      } else {
        alert(res.errors);
      }
    }, err => {
    });
  }


  ngOnInit() {
    this.getDevices();
  }
  getDevices(): any {
    this.loadData(this.pageSize,this.pageIndex);
  }
  addNewDevice(){
    debugger;
    for(let i=0;i<100;i++){
      
    this.deviceService.addNewDevices(this.newDevice).subscribe(res=>{
      if(res.isSuccess){
        
        this.getDevices();
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
  }
  
  //toggle show off insert form
  show= false;
clickEvent(){
    this.show = !this.show;       
}

delete(id){
  debugger;
  
  this.deviceService.deleteDevice(id).subscribe(res=>{
    if(res.isSuccess){
      debugger;

      this.getDevices();
    }else{
      debugger;

      alert(res.errors);
    }
  },
  err=>{
    debugger;
    alert(err);
  })
}

}
