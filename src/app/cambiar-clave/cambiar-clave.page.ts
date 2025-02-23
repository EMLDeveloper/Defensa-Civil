import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) {this.formularioRegistro = this.fb.group({
    'nombre': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
    'confirmacionPassword': new FormControl("", Validators.required)
  }); }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

  await alert.present();
  return;
  }

  var usuario = {
    nombre: f.nombre,
    password: f.password
  }
  
  localStorage.setItem('usuario',JSON.stringify(usuario));
  
  localStorage.setItem('ingresado','true');
  this.navCtrl.navigateRoot('inicio');
  const alert = await this.alertController.create({
    header: 'Datos completos',
    message: 'Exitosamente Guardado',
    buttons: ['Aceptar']

  });

  await alert.present();
  return;

  }


}
