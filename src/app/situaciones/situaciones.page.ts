import { Component, OnInit } from '@angular/core';
import { MapControllerService } from '../services/mapcontroller.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { registro } from '../models/registro';

@Component({
  selector: 'app-situaciones',
  templateUrl: './situaciones.page.html',
  styleUrls: ['./situaciones.page.scss'],
})
export class SituacionesPage implements OnInit {

  public mensaje!: string;
  public exito!: boolean;

  public token!: string;
  public lista!: any;

  constructor(private router: Router,
    private http: HttpClient,
    private toke: MapControllerService,
    private alertController: AlertController) { 
      this.situacion();
    }

  ngOnInit() {
    this.situacion();
  }

  misSituaciones(credenciales: registro) {

    //API
    const url = 'https://adamix.net/defensa_civil/def/situaciones.php';


    let data = new FormData();
    let resultado = {};
    for (let k in credenciales) {
      data.append(k, credenciales[k]);
    }

    this.http.post<any>(url, data).subscribe((res) => {

      this.token = this.toke.token;
      console.log(this.token + " " + "TOKEN");
    
      this.mensaje = res.mensaje;
     
      this.exito = res.exito;

      this.lista = res.datos;

      console.log(this.lista);

      if (this.exito == true) {
        console.log(this.mensaje + ' consultado exitosamente! ' + ', Exito = ' + this.exito);
      } else {
        this.alerta();
        console.log('Ha ocurrido un error: ' + this.mensaje + ', Exito = ' +  this.exito);
      }

    });
  }

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Ha ocurrido un error',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  inicio() {
    this.router.navigate(['/iniciar-sesion']);
  }

  situacion() {

    const credenciales: registro = {
      token:this.toke.token
    };
    console.log(credenciales);
    this.misSituaciones(credenciales);
  }




}
