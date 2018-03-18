import { Point } from './point';

export interface SegmentPointSet {
    id: number;
    segment_id: number;
    start_point_id: number;
    end_point_id: number;
    length: number;
    points: Point[];
}
