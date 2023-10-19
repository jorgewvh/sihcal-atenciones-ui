export interface Locations {
    location: Location;
    children: Locations[]
}

export interface Location {
    code: string;
    id: string;
    isoName: string;
    locationType: string;
    name: string;
    parentId: string;
}


