import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MapControllerService } from '../services/mapcontroller.service';
import { iniciar } from '../models/iniciar';



@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  public cedula!: string;
  public clave!: string;
  public mensaje!: string;
  public exito!: boolean;

  constructor(private router: Router, 
    private http: HttpClient, 
    private toke: MapControllerService,
    private alertController: AlertController) { 

  }

  ngOnInit() {
  }

  iniciar(credenciales: iniciar) {

    //API
    const url = 'https://adamix.net/defensa_civil/def/iniciar_sesion.php';

  
    let data = new FormData();
    for (let k in credenciales) {
      data.append(k, credenciales[k]);
    }

    this.http.post<any>(url, data).subscribe((res) => {

      this.toke.token = res.datos.token;

      this.mensaje = res.mensaje;
  
      this.exito = res.exito;

      if (this.exito == true) {
        this.router.navigate(['/inicio']);
        console.log(this.mensaje + ' su token es: ' + this.toke.token + ', Exito = ' + this.exito);
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

  iniciarS() {
 
    const credenciales: iniciar = {
      cedula: this.cedula,
      clave: this.clave
    };
    this.iniciar(credenciales);
  }

}
