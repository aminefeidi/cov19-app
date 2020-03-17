import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, retry } from 'rxjs/operators';
import { Country } from '../models/country';
import { GlobalData } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public allData:Observable<Country[]> = new Observable<Country[]>();
  public globalData:Observable<GlobalData> = new Observable<GlobalData>();

  public apiUrl:string = true ? 'https://arcane-island-41018.herokuapp.com':'http://192.168.1.102:3000';

  constructor(private http:HttpClient) {
    this.allData = this.http.get<Country[]>(this.apiUrl+'/all').pipe(
      retry(3),
      shareReplay(1)
    )
    this.globalData = this.http.get<GlobalData>(this.apiUrl+'/global').pipe(
      retry(3),
      shareReplay(1)
    )
  }

  getData():Observable<Country[]>{
    return this.allData;
  }

  getGlobalData():Observable<GlobalData>{
    return this.globalData;
  }

  getCountry(id:string):Observable<Country>{
    return this.http.get<Country>(this.apiUrl+'/country/'+id).pipe(
      retry(3),
    )
  }

  getMapData(){
    return this.http.get(this.apiUrl+'/geoJson').pipe(
      retry(3),
      shareReplay(1)
    )
  }

  getlastUpdate(){
    return this.http.get<string>(this.apiUrl+'/lastUpdate').pipe(
      retry(3),
      shareReplay(1)
    )
  }
}
