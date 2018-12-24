import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private deviceService:DeviceService) { }
@Input() newDevice={name:'',type:0};
  devices=[{name:'',type:0,id:0}]
  ngOnInit() {
    this.getDevices();
  }
  getDevices(): any {
    this.deviceService.getDevices().subscribe(res=>{
      if(res.isSuccess){
        this.devices=res.value;
      }else{
        alert(res.errors);
      }
    })
  }
  addNewDevice(){
    debugger;
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
