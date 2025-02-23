import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Marker } from '../models/marker.model';

const apikey = 'cKHkgf1mXO5KtOM-QWN4rKENuUaMRPbaOv2_FwEjFC8';

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {

  public token!: string;

  private marker: Marker = null!;

  constructor(private http: HttpClient) { }

  getMarker(){
    return this.marker;
  }

  addMarker(marker: Marker) {
    this.marker = marker;
  }

  getHttpData(marker: Marker) {
    var link = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${marker.lat},${marker.lng}&lang=es-DO&apikey=${apikey}`;
    return this.http.get(link);
  }
}
