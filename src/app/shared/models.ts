export interface CarModel {
    "code":string;
    "description":string;
    "colors": Color[]
}

export interface Color{
    "code": string;
    "description":string;
    "price": number
}

export interface ModelConfiguration {
    "configs": Configuration[];
    "towHitch": boolean;
    "yoke": boolean; 
}

export interface Configuration {
    "id":number;
    "description":string;
    "range":number;
    "speed":number;
    "price":number;
}

export interface Model {
    "code":string;
    "description":string;
}


