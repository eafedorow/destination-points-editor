import {LatLngExpression} from "leaflet";

export interface IPoint {
    id: number;
    name: string;
    position: LatLngExpression;
}