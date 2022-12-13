import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'medkit' },
    { title: 'Iniciar Sesion', url: '/iniciar-sesion', icon: 'log-in' },
    { title: 'Historia', url: '/historia', icon: 'document-text' },
    { title: 'Servicios', url: '/servicios', icon: 'server' },
    { title: 'Noticias', url: '/noticias', icon: 'alert-circle' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Albergues', url: '/albergues', icon: 'home' },
    { title: 'Medidas Preventivas', url: '/medidas-preventivas', icon: 'warning' },
    { title: 'Miembros', url: '/miembros', icon: 'people-circle' },
    { title: 'Mapa', url: '/mapa', icon: 'map' },
    { title: 'Reportes', url: '/reportes', icon: 'documents' },
    { title: 'Mis Situaciones', url: '/situaciones', icon: 'sad' },
    { title: 'Desarrolladores', url: '/desarrolladores', icon: 'code-working' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
