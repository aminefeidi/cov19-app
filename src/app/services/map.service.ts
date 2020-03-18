import {
  ComponentFactoryResolver,
  Injector,
  Injectable,
} from "@angular/core";
import * as L from "leaflet";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import { DataService } from "./data.service";
import { PopupComponent } from "../features/popup/popup.component";

@Injectable({
  providedIn: "root"
})
export class MapService {
  markers: string = "/assets/data/geo.json";

  static ScaledRadius(val: number, maxVal: number): number {
    return (80 / maxVal) * val + 15;
  }

  constructor(
    private dataService: DataService,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  makeMarkers(map: L.map): void {
    this.dataService.getMapData().subscribe((res: any) => {
      const maxVal = Math.max(...res.features.map(x => x.properties.toll), 0);
      for (const c of res.features) {
        if (c.properties.toll > 0) {
          const isDesktop = this.deviceService.isDesktop();
          const factory = this.resolver.resolveComponentFactory(PopupComponent);
          const component = factory.create(this.injector);
          component.instance.data = c.properties;
          component.instance.isPopup = !isDesktop;
          component.changeDetectorRef.detectChanges();
          const popupContent = component.location.nativeElement;
          const lat = c.geometry.coordinates[0];
          const lon = c.geometry.coordinates[1];
          const circle = L.circleMarker([lon, lat], {
            radius: MapService.ScaledRadius(c.properties.toll, maxVal),
            color:"hsl(348, 100%, 61%)",
            weight:1,
            fillOpacity:0.5,
            clickable:true
          });
          if(isDesktop){
            circle.bindTooltip(popupContent).openTooltip()
            let id = c.properties.countryId;
            circle.on('click', ()=>this.router.navigate(['/details/'+id])).addTo(map)
          }else{
            circle.bindPopup(popupContent);
            circle.addTo(map)
          }
        }
      }
    });
  }
}
