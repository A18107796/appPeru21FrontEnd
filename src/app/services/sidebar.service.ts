import { Injectable } from '@angular/core';
declare var jQuery: any;
declare var $: any;

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
        { titulo: 'Cursos', url: 'cursos' },
        { titulo: 'Periodos', url: 'periodos' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'fas fa-user-friends',
      submenu: [
        { titulo: 'Empleados', url: 'empleados' },
        { titulo: 'Estudiantes', url: 'estudiantes' }
      ]
    },
    {
      titulo: 'Operaciones',
      icono: 'fas fa-book',
      submenu: [
        { titulo: 'Matricular', url: 'matricular' },
     
      ]
    },
    {
      titulo: 'Matriculas',
      icono: 'fas fa-list',
      url: 'matriculas',
      submenu: []
    }
  ];
  constructor() { }

  static iniciarMenu() {
    setTimeout(() => {
      var events = jQuery._data(document, 'events')["click"];
      $(document).off('click', '[data-widget=\"treeview\"] .nav-link');
      events = jQuery._data(document, 'events')["click"];
      $('[data-widget="treeview"]').Treeview('init');
      events = jQuery._data(document, 'events')["click"];
    }, 1500);

  }

  /*   const navs = document.getElementsByClassName("nav-link nav-event");
  for (let index = 0; index < navs.length; index++) {
    console.log(navs[index]);
    console.log(navs[index].eventListeners?.bind);
 
  } */
}
