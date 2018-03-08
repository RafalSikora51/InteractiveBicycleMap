import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Segment } from '../Model/segment';
@Injectable()
export class SegmentService {

  private SEGMENTS_API_URL = 'http://localhost:9090/segments';

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

  public getAllSegments(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.SEGMENTS_API_URL)
      .pipe(
        tap(users => this.log(`fetched segments`)),
        catchError(this.handleError('getAllSegments', []))
      );
  }
}
