import { Component, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import { MapService } from '../services/map.service';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements AfterViewInit {
  private map;

  constructor(private mapService:MapService) {}

  ngAfterViewInit() {
    this.initMap();
    this.mapService.makeMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map("map", {
      center: [34,9],
      zoom: 5,
      minZoom:2
    });
    const tiles = L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey={apikey}', {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      apikey: '3a4224e043894754a7c7b2c3d6877e5d',
      maxZoom: 22,
      noWrap:true
    });

    this.map.setMaxBounds(  [[-90,-180],   [90,180]]  )


    tiles.addTo(this.map);
  }
}
