import { Component, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";
import { NotificationService } from "./services/notification.service";
import { Country } from "./models/country";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Corona Tracker";
  navStatus = true;
  lastUpdate: string = "";
  isSub = true;
  userIp;
  userCountry: Country;
  userCountryName: string;
  countries: Country[];

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {
    this.dataService.getlastUpdate().subscribe(res => {
      const ms = Number(res);
      if (isNaN(ms)) return;
      let m = ms / 60000;
      const h = m / 60;
      if (ms < 3600000) {
        this.lastUpdate = Math.round(m) + " minutes";
      } else {
        m = m % 60;
        this.lastUpdate =
          Math.round(h) + " hours " + Math.round(m) + " minutes";
      }
    });
  }

  navToggle() {
    this.navStatus = !this.navStatus;
  }

  subscribe() {
    this.notificationService.subscribe();
    this.isSub = true;
  }

  nameToIcon(name: string) {
    if (name === "Cruise Ship") return "us";
    if (name === "Macau") return "china";
    if (name === "North Macedonia") return "europe";
    if (name === "Saint Barthelemy") return "france";
    if (name === "Taiwan*") return "taiwan";
    if (name === "Holy See") return "italy";
    return name.replace(/\s+/g, "-").toLowerCase();
  }

  ngOnInit() {
    this.notificationService.getSubscription().subscribe(res => {
      if (!res) this.isSub = false;
    });
    this.dataService.getUserIp().subscribe(res => {
      this.dataService.getCountryNameByIp(res.ip).subscribe(data => {
        this.userCountryName = data["country_name"];
        this.dataService.getData().subscribe(cArr=>{
          for(let c of cArr){
            if(c.name === this.userCountryName){
              this.userCountry = c;
              break;
            }
          }
        })
      });
    });
  }
}
