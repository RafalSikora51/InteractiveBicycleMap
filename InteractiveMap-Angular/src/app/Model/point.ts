import { Segment } from './segment';
export interface Point {
    id: number;
    lat: number;
    lng: number;
    segment: Segment;
}
