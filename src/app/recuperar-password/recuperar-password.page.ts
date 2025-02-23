import { Component, OnInit } from '@angular/core';

import { AlertController, NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MapControllerService } from '../services/mapcontroller.service';
import { registro } from '../models/registro';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  public mensaje!: string;
  public exito!: boolean;

  public clave_anterior!: string;
  public clave_nueva!: string;
  public token!: string;

  constructor(private router: Router,
    private http: HttpClient,
    private toke: MapControllerService,
    private alertController: AlertController) { 
  }

  ngOnInit() {
  }

  cambiarPass(credenciales: registro) {

    //url de la API
    const url = 'https://adamix.net/defensa_civil/def/cambiar_clave.php';
    
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

      if (this.exito == true) {
        this.router.navigate(['/iniciar-sesion']);
        console.log(this.mensaje + ' registrado exitosamente! ' + ', Exito = ' + this.exito);
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

  guardar() {
   
    const credenciales: registro = {
      clave_anterior: this.clave_anterior,
      clave_nueva: this.clave_nueva,
      token:this.toke.token
    };
    console.log(credenciales);
    this.cambiarPass(credenciales);
  }

}
