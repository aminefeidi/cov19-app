import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import { Country } from '../models/country';
import * as shape from 'd3-shape';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public country : Country;
  iconName:string = "";

  isSub:boolean = true;

  isLoading:boolean = true;

  selectedType:string = "toll";
  colors = {toll:'hsl(348, 100%, 61%)',recovered:'hsl(171, 100%, 41%)',deaths:'hsl(48, 100%, 67%)',sick:'hsl(217, 71%, 53%)'};

  lineChartData:any[];
  maxScale:number;
  curve = shape.curveBasis;
  lineChartColorScheme = {
    domain: ['hsl(348, 100%, 61%)']
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location:Location,
    private notificationService:NotificationService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getCountry(id).subscribe(res=>{
      this.country = res;
      this.iconName = this.nameToIcon(this.country.name);
      this.loadLineChartData('toll');
      this.isLoading = false;
    },
    err=>{
      this.router.navigate(['error']);
    })
  }

  nameToIcon(name:string){
    if(name === "Diamond Princess cruise ship") return "us";
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  loadLineChartData(type:string){
    let data = [
      {
        name: "Global",
        series: []
      }
    ]
    for (let [date,toll] of Object.entries(this.country.history[type])){
      let JsDate = new Date(Date.parse(date))
      data[0]['series'].push({'name':JsDate,'value':toll});
    }
    this.lineChartData = data;
    this.lineChartColorScheme = {
      domain: [this.colors[type]]
    };
    this.maxScale = this.country.toll;
  }

  switchType(type:string){
    this.loadLineChartData(type);
    this.selectedType = type;
  }

  goBack(){
    this.location.back();
  }
  
  subscribe(){
    this.notificationService.subscribe()
    this.isSub = true;
  }

  ngOnInit() {
    this.notificationService.getSubscription().subscribe(res=>{
      if (!res) this.isSub = false; 
    })
  }

}
