import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"]
})
export class CountriesComponent implements OnInit {
  countries = [];
  isLoading:boolean = true;
  public searchText = new FormControl("");

  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe(res=>{
      this.countries = res.sort((a, b) => b.sick - a.sick);
      this.isLoading = false;
    },
    err=>{
      this.router.navigate(['error']);
    })
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
