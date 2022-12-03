import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'document-text' },
    { title: 'Historia', url: '/historia', icon: 'document-text' },
    { title: 'Servicios', url: '/servicios', icon: 'server' },
    { title: 'Noticias', url: '/noticias', icon: 'alert-circle' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Albergues', url: '/albergues', icon: 'home' },
    { title: 'Medidas Preventivas', url: '/medidas-preventivas', icon: 'warning' },
    { title: 'Miembros', url: '/miembros', icon: 'people-circle' },
    { title: 'Inscripcion', url: '/inscripcion', icon: 'person-add' },
    { title: 'Mis Situaciones', url: '/situaciones', icon: 'walk' },
    { title: 'Reportes', url: '/reportes', icon: 'documents' },
    { title: 'Iniciar Sesion', url: '/iniciar-sesion', icon: 'log-in' },
    { title: 'Cambiar Clave', url: '/cambiar-clave', icon: 'none' },
    { title: 'Recuperar Contraseña', url: '/recuperar-password', icon: 'none' },
    { title: 'Desarrolladores', url: '/desarrolladores', icon: 'code-working' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
