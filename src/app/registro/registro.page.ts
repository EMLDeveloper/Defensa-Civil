import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  email: string = ""
  password: string = ""

  formularioRegistro: FormGroup;
  constructor(private router:Router ,private auth:AngularFireAuth,public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      // 'confirmacionPassword': new FormControl("", Validators.required)
    });
   }

  ngOnInit() {
  }

  // async guardar(){
  //   var f = this.formularioRegistro.value;

  //   if(this.formularioRegistro.invalid){
  //     const alert = await this.alertController.create({
  //       header: 'Datos incompletos',
  //       message: 'Tienes que llenar todos los datos',
  //       buttons: ['Aceptar']
  //     });

  // await alert.present();
  // return;
  // }

  // var usuario = {
  //   nombre: f.nombre,
  //   password: f.password
  // }
  
  // localStorage.setItem('usuario',JSON.stringify(usuario));
  
  // localStorage.setItem('ingresado','true');
  // this.navCtrl.navigateRoot('inicio');



  guardar(){
    
  this.email = ((document.getElementById("name") as HTMLInputElement).value);
  this.password = ((document.getElementById(("password")) as HTMLInputElement).value);


  this.auth.
  createUserWithEmailAndPassword(this.email , this.password)
  .then(userCredential =>  {
    
    if(userCredential.user){
      window.alert("Registrado Exitosamente");
        this.router.navigateByUrl('/iniciar-sesion');
    }

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorMessage)
    // ..
  });
  }
  

}

