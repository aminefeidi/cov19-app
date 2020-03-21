import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { GlobalData } from '../models/global';

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"]
})
export class CountriesComponent implements OnInit {
  countries = [];
  isLoading:boolean = true;
  public searchText = new FormControl("");
  globalData:GlobalData;
  selectedType:string = "sick";

  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe(res=>{
      let arr = res.sort((a, b) => b.sick - a.sick);
      arr.forEach((c,i)=>{
        c.pos = i;
      })
      this.countries = arr;
      this.isLoading = false;
    },
    err=>{
      this.router.navigate(['error']);
    })
    this.dataService.getGlobalData().subscribe(res=>{
      this.globalData = res;
    })
  }

  switchType(type:string){
    this.selectedType = type;
    this.countries = this.sortCountries(this.countries,type);
  }

  sortCountries(countries,type){
    let arr = countries.sort((a, b) => b[type] - a[type]);
    arr.forEach((c,i)=>{
      c.pos = i;
    })
    return arr;
  }

  nameToIcon(name:string){
    if(name === "Cruise Ship") return "us";
    if(name === "Macau") return 'china';
    if(name === "North Macedonia") return 'europe';
    if(name === "Saint Barthelemy") return 'france';
    if(name === "Taiwan*") return 'taiwan';
    if(name === "Holy See") return 'italy';
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}
