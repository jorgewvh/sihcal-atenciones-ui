import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { LocationState, LocationStore } from "./locations.store";

@Injectable({providedIn: "root"})
export class LocationsQuery extends QueryEntity<LocationState> {
    constructor(protected locationsStore: LocationStore) {
        super(locationsStore);
    }
    selectLoaded$ = this.select((state) => state.isLoaded);
}