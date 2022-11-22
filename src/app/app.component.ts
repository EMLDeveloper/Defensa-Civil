import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Servicios', url: '/servicios', icon: 'mail' },
    { title: 'Noticias', url: '/noticias', icon: 'paper-plane' },
    { title: 'Videos', url: '/videos', icon: 'heart' },
    { title: 'Albergues', url: '/albergues', icon: 'archive' },
    { title: 'Medidas Preventivas', url: '/medidas-preventivas', icon: 'paper-plane' },
    { title: 'Miembros', url: '/miembros', icon: 'paper-plane' },
    { title: 'Inscripcion', url: '/inscripcion', icon: 'paper-plane' },
    { title: 'Iniciar Sesion', url: '/iniciar-sesion', icon: 'paper-plane' },
    { title: 'Mis Situaciones', url: '/situaciones', icon: 'paper-plane' },
    { title: 'Reportes', url: '/reportes', icon: 'paper-plane' },
    { title: 'Cambiar Clave', url: '/cambiar-clave', icon: 'warning' },
    { title: 'Recuperar Contraseña', url: '/recuperar-password', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
