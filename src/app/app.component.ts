import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Corona-Tracker';
  navStatus = false;
  lastUpdate:string = "";

  constructor(private dataService:DataService){
    this.dataService.getlastUpdate().subscribe(res=>{
      const ms = Number(res);
      if(isNaN(ms)) return;
      let m = (ms/(60000));
      const h = (m/60);
      if(ms < 3600000){
        this.lastUpdate = Math.round(m) + " minutes"
      }else{
        m = m % 60;
        this.lastUpdate = Math.round(h) + " hours " + Math.round(m) + " minutes"
      }
    })
  }

  navToggle(){
    this.navStatus = !this.navStatus;
  }
}
