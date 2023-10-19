import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Locations } from "../../models/locations.model";

export interface LocationState extends EntityState<Locations, string> {
    isLoaded: boolean;
    locations: Locations[];
}

export function createInitialState(): LocationState {
    return {
        isLoaded: false,
        locations: []
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "locations"})
export class LocationStore extends EntityStore<LocationState> {
    constructor() {
        super(createInitialState());
    }

    updateLocations(isLoaded: boolean) {
        this.update((state: LocationState) => ({...state, isLoaded}));
    }

    /* destroy(): void {
        this.updateLocations(false);
    } */
}
