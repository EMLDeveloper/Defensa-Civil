import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CoordInfo } from '../models/coord-info.models';
import { Marker } from '../models/marker.model';
import { MapControllerService } from '../services/mapcontroller.service';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  //variables Usadas
  map = null;
  marker: Marker = null!;
  coordInfo: CoordInfo = null!;

  //#region Array of para llenar con api
  ObjetoInfo: Marker[] = [
    {
      ciudad: '',
      codigo: '',
      edificio: 'Defensa Civil (San Cristobal)',
      coodinador: 'Coronel Eduardo',
      telefono: '849-456-4432',
      capacidad: '100 personas',
      lat: 18.4090713205532,
      lng: -70.10622631521755,
    },
    {
      ciudad: '',
      codigo: '',
      edificio: 'Defensa Civil (Santo Domingo)',
      coodinador: 'Juan Pablo Molina',
      telefono: '829-334-3421',
      capacidad: '200 personas',
      lat: 18.488815212495442,
      lng: -69.92202051702928,
    },
  ];
  constructor(
    private mapaController: MapControllerService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map')!;
    // create LatLng object
    const myLatLng = { lat: 18.489065101736063, lng: -69.92187218117361 };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
    });
    
    this.http
      .get<any>('https://adamix.net/defensa_civil/def/albergues.php')
      .subscribe((res) => {
        console.log(res);

        for (let i = 0; i < res.datos.length; i++) {
            this.ObjetoInfo.push({
              ciudad: res.datos[i].ciudad,
              codigo: res.datos[i].codigo,
              edificio: res.datos[i].edificio,
              coodinador: res.datos[i].coordinador,
              telefono: res.datos[i].telefono,
              capacidad: res.datos[i].capacidad,
              lat: parseFloat(res.datos[i].lng),
              lng: parseFloat(res.datos[i].lat),
            });
        }
        console.table(res.datos.length);
        console.table(this.ObjetoInfo);
      });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.ObjetoInfo.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    var mapMarker;
    mapMarker = new google.maps.Marker({
      position: {
        lat: marker.lat,
        lng: marker.lng
      },
      map: this.map,
      title: marker.edificio,
    });
    this.addInfoToMarker(marker, mapMarker);
    return mapMarker;
  }

  addInfoToMarker(marker: Marker, mapMarker: any) {

    this.mapaController.getHttpData(marker).subscribe((coordData: any) => {
      this.coordInfo = {
        country: coordData.items[0].address.countryName,
        city: coordData.items[0].address.city,
        marker: marker,
      };

      let infoWindowContent = `
      <div id="content" style="color: black;">
        <h2 id="firstHeading" class="firstHeading"> ${marker.edificio} </h2>
        <p>Coordinador: ${marker.coodinador} </p>
        <p>Telefono: ${marker.telefono} </p>
        <p>Capacidad: ${marker.capacidad} </p>
        <p>Pais: ${this.coordInfo.country} </p>
        <p>Ciudad: ${this.coordInfo.city} </p>
      </div>
      `;

      let infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      mapMarker.addListener('click', () => {
        infoWindow.open(this.map, mapMarker);
      });
    });
    
  }
}
