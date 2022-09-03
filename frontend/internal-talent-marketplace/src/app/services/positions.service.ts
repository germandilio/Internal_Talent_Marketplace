import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Position } from '../common/position';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  ids: number[] = [];

  baseURL: string = environment.itmApiBasePath + environment.positionApiPostfix;

  constructor(private httpClient: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.httpClient.get<ConvertPositionResponce>(this.baseURL).pipe(
      map(data => data._embedded.positions)
    );
  }

  setIds(ids: number[]) {
    this.ids = ids;
  }
}

export interface ConvertPositionResponce {
  _embedded: {
    positions: Position[]
  }
}
