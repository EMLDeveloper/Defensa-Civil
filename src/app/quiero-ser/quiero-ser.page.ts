import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { MapControllerService } from '../services/mapcontroller.service';
import { registro } from '../models/registro';

@Component({
  selector: 'app-quiero-ser',
  templateUrl: './quiero-ser.page.html',
  styleUrls: ['./quiero-ser.page.scss'],
})
export class QuieroSerPage implements OnInit {

  public cedula!: string;
  public nombre!: string;
  public apellido!: string;
  public clave!: string;
  public correo!: string;
  public telefono!: string;

  public mensaje!: string;
  public exito!: boolean;

  

  constructor(
    private router: Router,
    private http: HttpClient,
    private toke: MapControllerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  Registrar(credenciales: registro) {

    //API
    const url = 'https://adamix.net/defensa_civil/def/registro.php';

    
    let data = new FormData();
    let resultado = {};
    for (let k in credenciales) {
      data.append(k, credenciales[k]);
    }

    this.http.post<any>(url, data).subscribe((res) => {

     
      this.toke.token = res.datos.token;
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

  iniciar() {
   
    const credenciales: registro = {
      cedula: this.cedula,
      nombre: this.nombre,
      apellido: this.apellido,
      clave: this.clave,
      correo: this.correo,
      telefono: this.telefono
    };
    console.log(credenciales);
    this.Registrar(credenciales);
  }

  iniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

}
