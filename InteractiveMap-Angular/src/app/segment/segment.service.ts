import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Segment } from '../Model/segment';
import { SegmentPointSet } from '../Model/SegmentPointSet';
@Injectable()
export class SegmentService {

  private SEGMENTS_API_URL = 'http://localhost:9090/segments';
  private SEGMENTSALL_API_URL = 'http://localhost:9090/segments/all';
  private DIJKSTRA = 'http://localhost:9090/graph/dijkstra/';
  private NODES_API_URL = 'http://localhost:9090/graph/nodes';
  private DIJKSTRALIST_API_URL = 'http://localhost:9090/graph/dijkstra';


  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
  private log(message: string) {
    console.log(message);
  }

  public shortestDijkstraPath(startID: number, endID: number): Observable<SegmentPointSet[]> {
    return this.http.get<any>(this.DIJKSTRA + `/${startID}/${endID}`)
      .pipe(
        tap(segments => this.log(`fetched shortest Dijkstra Path`)),
        catchError(this.handleError('SegmentPointSet', []))
      );

  }

  public getAllSegments(): Observable<Segment[]> {
    return this.http.get<any>(this.SEGMENTS_API_URL)
      .pipe(
        tap(segments => this.log(`fetched segments`)),
        catchError(this.handleError('getAllSegments', []))
      );
  }

  public getAllPointsForSegment(id: number): Observable<any> {
    return this.http.get<any>(this.SEGMENTS_API_URL + `/${id}`)
      .pipe(
        tap(segments => this.log(`fetched points for current segment`)),
        catchError(this.handleError('getAllPointsForSegment', []))
      );
  }

  public getAllSegmentsWithPoints(): Observable<SegmentPointSet[]> {
    return this.http.get<any>(this.SEGMENTSALL_API_URL)
      .pipe(
        tap(segments => this.log(`fetched all segments with all points`)),
        catchError(this.handleError('getallSegmentsWithPoints', []))
      );
  }

  public getAllNodes(): Observable<Segment[]> {
    return this.http.get<any>(this.NODES_API_URL)
      .pipe(
        tap(segments => this.log(`fetched nodes`)),
        catchError(this.handleError('getAllNodes', []))
      );
  }

  public dijkstraOnList(markers: any[]): Observable<any> {

    return this.http.post(this.DIJKSTRALIST_API_URL, markers)
    .pipe(
      catchError(this.handleError('addHero', markers))
    );

  }


}
