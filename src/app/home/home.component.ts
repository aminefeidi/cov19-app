import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Country } from '../models/country';
import { GlobalData } from '../models/global';
import { Router } from '@angular/router';
import * as shape from 'd3-shape';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSub:boolean = true;

  countries:Country[];

  globalData:GlobalData;

  selectedType:string = "toll";
  isLoading:boolean = true;

  colors = {toll:'hsl(348, 100%, 61%)',recovered:'hsl(171, 100%, 41%)',deaths:'hsl(48, 100%, 67%)',sick:'hsl(217, 71%, 53%)'};

  barChartData:any[];
  barChartMax:any;
  barChartColorScheme = {
    domain: ['hsl(348, 100%, 61%)']
  };

  lineChartData:any[];
  lineChartMax:any;
  curve = shape.curveBasis;
  lineChartColorScheme = {
    domain: ['hsl(348, 100%, 61%)']
  };

  constructor(private dataService:DataService,private notificationService:NotificationService,private router:Router) {}

  loadBarChartData(type:string){
    this.countries.sort((a, b) => b[type] - a[type]);
    let data = [];
    for(let i=0;i<5;i++){
      data.push({"name": this.countries[i].name,"value": this.countries[i][type]})
    }
    this.barChartData = data;
    this.barChartColorScheme = {
      domain: [this.colors[type]]
    };
    this.barChartMax = this.countries[0].toll;
  }

  loadLineChartData(type:string){
    let data = [
      {
        name: "Global",
        series: []
      }
    ]
    for (let [date,toll] of Object.entries(this.globalData.history[type])){
      let JsDate = new Date(Date.parse(date))
      data[0]['series'].push({'name':JsDate,'value':toll});
    }
    this.lineChartData = data;
    this.lineChartColorScheme = {
      domain: [this.colors[type]]
    };
    this.lineChartMax = this.globalData.toll;
  }

  switchType(type:string){
    this.loadBarChartData(type);
    this.loadLineChartData(type);
    this.selectedType = type;
  }

  async getAllData():Promise<void>{
    return new Promise((resolve,reject)=>{
      this.dataService.getData().subscribe(res=>{
        this.countries = res//.sort((a, b) => b.toll - a.toll);
        this.loadBarChartData('toll');
        this.dataService.getGlobalData().subscribe(res=>{
          this.globalData = res;
          this.loadLineChartData('toll');
          resolve();
        },
        err=>{
          reject(err);
        })
      },
      err=>{
        reject(err);
      })
    })
  }

  ngOnInit() {
    this.getAllData().then(()=>{
      this.isLoading = false;
    }).catch(err=>{
      this.router.navigate(['error']);
    })
    this.notificationService.getSubscription().subscribe(res=>{
      if (!res) this.isSub = false; 
    })
  }

  subscribe(){
    this.notificationService.subscribe()
    this.isSub = true;
  }

}
