import { Component, OnInit } from '@angular/core';
import { SegmentService } from './segment.service';
import { Point } from '../Model/point';
import { Segment } from '../Model/segment';
import { SegmentPointSet } from '../Model/SegmentPointSet';
@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  constructor(private segmentService: SegmentService) { }
  segmentId: number;
  points: Point[];
  segments: Segment[];
  segmentsWithPoints: SegmentPointSet[];
  ngOnInit() {
    this.segmentsWithPoints = this.getAllSegmentsWithPoints();
  }

  getSegments(): void {
    this.segmentService.getAllSegments()
      .subscribe(
        segments => {
          this.segments = segments;
          console.log('przed tabela');
          console.table(this.segments);
          console.log('po tabeli');
        },
        error => {
          console.log(error);
        }
      );
  }
  getAllSegmentsWithPoints(): SegmentPointSet[] {
    this.segmentService.getAllSegmentsWithPoints()
      .subscribe(
        segmentsWithPoints => {
          this.segmentsWithPoints = segmentsWithPoints;
           console.log('getAllSegmentsWithPoints(segementsComponent) works!');
           console.table(this.segmentsWithPoints);
        },
        error => {
          console.log(error);
        }
      );
    return this.segmentsWithPoints;
  }

  showTest() {
    console.log(this.segmentsWithPoints);
  }



  getAllPointsForSegment(): void {
    this.segmentService.getAllPointsForSegment(this.segmentId)
      .subscribe(
        segments => {
          this.segments = segments;
          console.log('przed tabela');
          console.table(this.segments);
          console.log('po tabeli');
        },
        error => {
          console.log(error);
        }

      );
  }

}
