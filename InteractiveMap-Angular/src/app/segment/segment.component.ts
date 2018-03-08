import { Component, OnInit } from '@angular/core';
import { SegmentService } from './segment.service';
import { Point } from '../Model/point';
import { Segment } from '../Model/segment';
@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  constructor(private segmentServie: SegmentService) { }

  points: Point[];
  segments: Segment[];

  ngOnInit() {
    this.getSegments();
  }

  getSegments(): void {
    this.segmentServie.getAllSegments()
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
