import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchPipe } from './search.pipe';
import { CountriesComponent } from './countries/countries.component';
import { DetailComponent } from './detail/detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorComponent } from './features/error/error.component';
import { MapComponent } from './map/map.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PopupComponent } from './features/popup/popup.component';
import { from } from 'rxjs';

@NgModule({
  entryComponents:[PopupComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SearchPipe,
    CountriesComponent,
    DetailComponent,
    ErrorComponent,
    MapComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    TooltipModule,
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
