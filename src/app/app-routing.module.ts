import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CountriesComponent } from "./countries/countries.component";
import { DetailComponent } from './detail/detail.component';
import { ErrorComponent } from './features/error/error.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "countries", component: CountriesComponent },
  { path: "map", component: MapComponent },
  { path: "details/:id", component: DetailComponent },
  { path: "error", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
