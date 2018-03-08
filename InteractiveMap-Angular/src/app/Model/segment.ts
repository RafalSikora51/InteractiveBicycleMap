import { Point } from './point';

export interface Segment {
    segment_id: number;
    start_point_id: number;
    end_point_id: number;
    length: number;
    point: Point;
}
