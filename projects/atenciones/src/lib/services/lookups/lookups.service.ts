import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import { LocationStore } from '../../state/locations/locations.store';
import { Locations } from '../../models/locations.model';
import { Offices } from '../../models/office.model';

@Injectable()
export class LookupsService extends BaseHttpService {

  readonly baseUrl = environment.API.LOOKUPS_LOCATIONS;
  readonly lookupUrl = environment.API.LOOKUPS;

  constructor(http: HttpClient,
    private locationStore: LocationStore) {
    super(http);
  }

  getLocations():Observable<Locations[]> {
    return this.getRequest<Locations[]>(`${this.baseUrl}/v1/all`).pipe(
      map((locations) => {
         let hnLocations = locations.filter((l) => l.location.isoName === "HN");
        let data = hnLocations[0].children.map(location => location);
        this.locationStore.set(data);
        return data;
      }), tap(() => console.log(''))
    );
  }

  getCountries():Observable<any[]> {
    return this.getRequest<any[]>(`${this.baseUrl}/v1/all`).pipe(
      map((locations) => {
         let countries = locations.filter((l) => l.location.locationType === "COUNTRY");
         let data = countries.map((c)=> c.location);
        return data;
      }), tap(() => console.log(''))
    );
  }

  getOffices():Observable<Offices[]> {
    return this.getRequest<Offices[]>(`${this.lookupUrl}/Offices/v1/all`)
  }

  getCountry():Observable<any>{
    return this.getRequest<any[]>(`${this.baseUrl}/general-staff-data/v1/country/all`,);
  }


}
