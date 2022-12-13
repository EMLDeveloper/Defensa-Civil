import { Component, OnInit } from '@angular/core';

import { reportes } from '../models/reporte';
import { MapControllerService } from '../services/mapcontroller.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  public titulo!: string;
  public descripcion!: string;
  public foto!: string;
  public latitud!: string;
  public longitud!: string;

  public mensaje!: string;
  public exito!: boolean;

  constructor(private http: HttpClient, 
    private toke: MapControllerService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  reporte(reporte: reportes){
    const url = 'https://adamix.net/defensa_civil/def/nueva_situacion.php';

    let data = new FormData();
    let resultado = {};
    for (let k in reporte) {
      data.append(k, reporte[k]);
    }
    
    this.http.post<any>(url, data).subscribe((res) => {
      this.mensaje = res.mensaje;
      this.exito = res.exito;

      if (this.exito == true) {
        this.alertaCorrect();
        this.titulo = '';
        this.descripcion = '';
        this.foto = '';
        this.latitud = '';
        this.longitud = '';
        console.log(this.mensaje + ', Exito = ' + this.exito);
      } else {
        this.alertaError();
        console.log('Ha ocurrido un error: ' + this.mensaje + ', Exito = ' +  this.exito);
      }
    });

  }

  async alertaError() {
    const alert = await this.alertController.create({
      header: 'Ha ocurrido un error',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaCorrect() {
    const alert = await this.alertController.create({
      header: 'Reporte correcto',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  reportes() {
    const reporte: reportes = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      foto: this.foto,
      latitud: this.latitud,
      longitud: this.longitud,
      token: this.toke.token
    };
    this.reporte(reporte);
  }


}
