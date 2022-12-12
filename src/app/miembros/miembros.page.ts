import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.page.html',
  styleUrls: ['./miembros.page.scss'],
})
export class MiembrosPage implements OnInit {

  constructor(private http: HttpClient) {
    this.api();
   }

   public lista:any;

   api(){
    this.http
    .get<any>(
      'https://adamix.net/defensa_civil/def/miembros.php'
    )
    .subscribe((res)=>{
      console.log(res);
      this.lista = res.datos;
    });
  }

  ngOnInit() {
  }

}
