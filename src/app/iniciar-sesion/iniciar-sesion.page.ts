import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  name:any;
  password:any
  

  formularioLogin: FormGroup;

  constructor(private router:Router ,private auth:AngularFireAuth,public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController) { 
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar(){

    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem("usuario") || '{}');

    if(usuario.nombre == f.nombre && usuario.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('inicio');
      const alert = await this.alertController.create({
        header: 'completado',
        message: 'Estas dentro del Sistema',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
      
    }
    
    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

  await alert.present();
  return;
    }


    this.name = ((document.getElementById("name") as HTMLInputElement).value);
  this.password = ((document.getElementById(("password")) as HTMLInputElement).value);


  this.auth.
  signInWithEmailAndPassword(this.name , this.password)
  .then(userCredential => {
    
    if(userCredential.user){
      window.alert("Registrado Exitosamente");
        this.router.navigateByUrl('/inicio');
    }

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert("Error al iniciar sesion estos datos no existen")
    // ..
  });
    
  }

}
