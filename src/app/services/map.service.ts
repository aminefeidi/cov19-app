import { Injectable,Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common"
import * as L from "leaflet";
import { DataService } from "./data.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class MapService {
  markers: string = "/assets/data/geo.json";

  static ScaledRadius(val: number, maxVal: number): number {
    return (80 / maxVal) * val + 20;
  }

  constructor(private dataService: DataService,private deviceService:DeviceDetectorService,private router:Router) {}

  makeMarkers(map: L.map): void {
    this.dataService.getMapData().subscribe((res: any) => {
      const maxVal = Math.max(...res.features.map(x => x.properties.sick), 0);
      for (const c of res.features) {
        if (c.properties.toll > 0){
          const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const circle = L.circleMarker([lon, lat], {
          radius: MapService.ScaledRadius(c.properties.sick, maxVal)
        });
        const isDesktop = this.deviceService.isDesktop();
        isDesktop ? circle.bindTooltip(this.makeTooltip(c.properties)).openTooltip():circle.bindPopup(this.makePopup(c.properties));
        const that = this;
        circle.addTo(map).on('popupopen', function () {
          self.document.querySelector('.showMore')
            .addEventListener('click', (e) => {
              const target = e.target as HTMLSpanElement;
              const id = target.getAttribute('data-id');
              that.navigate(id);
            });
        });
        }
      }
    });
  }

  navigate(id) {
    this.router.navigate(['details',id]);
    //console.log('going to partner !');
    }

  makeTooltip(data: any) {
    if (data.region) {
      return (
        `` +
        `<div class="tags" style="text-align: center;">
        <span class="tag is-white is-large" >${data.region}</span>
      <span class="tag is-danger is-medium">infected: ${data.toll}</span>
      <span class="tag is-primary is-medium">recovered: ${data.recovered}</span>
      <span class="tag is-warning is-medium">dead: ${data.deaths}</span>
      <span class="tag is-info is-medium">sick: ${data.sick}</span>
        </div>`
      );
    } else {
      return (
        `` +
        `<div>
          <div class="tags" style="text-align: center;">
            <span class="tag is-white is-large">${data.country}</span>
            <span class="tag is-danger is-medium">infected: ${data.toll}</span>
            <span class="tag is-primary is-medium">recovered: ${data.recovered}</span>
            <span class="tag is-warning is-medium">dead: ${data.deaths}</span>
            <span class="tag is-info is-medium">sick: ${data.sick}</span>
          </div>
        </div>`
      );
    }
  }

  makePopup(data: any) {
    if (data.region) {
      return (
        `` +
        `<div style="text-align: center;">
        <div class="tags">
        <span class="tag is-white is-large" >${data.region}</span>
      <span class="tag is-danger is-medium">infected: ${data.toll}</span>
      <span class="tag is-primary is-medium">recovered: ${data.recovered}</span>
      <span class="tag is-warning is-medium">dead: ${data.deaths}</span>
      <span class="tag is-info is-medium">sick: ${data.sick}</span>
        </div>
        <a class="button showMore" > <span  class="icon is-small"> <i data-id="${data.countryId}" class="material-icons">
          more_horiz
          </i> </span> </a>
        </div>`
      );
    } else {
      return (
        `` +
        `<div style="text-align: center;">
          <div class="tags">
            <span class="tag is-white is-large">${data.country}</span>
            <span class="tag is-danger is-medium">infected: ${data.toll}</span>
            <span class="tag is-primary is-medium">recovered: ${data.recovered}</span>
            <span class="tag is-warning is-medium">dead: ${data.deaths}</span>
            <span class="tag is-info is-medium">sick: ${data.sick}</span>
          </div>
          <a class="button showMore" > <span class="icon is-small"> <i data-id="${data.countryId}" class="material-icons">
          more_horiz
          </i> </span> </a>
          </div>`
      );
    }
  }
}
