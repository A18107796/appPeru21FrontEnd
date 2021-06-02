import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'fas fa-tachometer-alt',
      url: 'dashboard',
      submenu: []
    },
    {
      titulo: 'Gestión Académica',
      icono: 'fas fa-university',
      submenu: [
        { titulo: 'Especializaciones', url: 'especializaciones' },
        { titulo: 'Cursos', url: 'cursos' }
      ]
    }
  ];
  constructor() { }
}
