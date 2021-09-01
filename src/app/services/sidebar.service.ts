import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
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
        { titulo: 'Pagos', url: 'pagos-inicio' },
        { titulo: 'Anular Pagos', url: 'anular-pagos' },

      ]
    },
    {
      titulo: 'Matriculas',
      icono: 'fas fa-list',
      url: 'matriculas',
      submenu: []
    },
    {
      titulo: 'Reportes y Graficas',
      icono: 'fas fa-file',
      submenu: [
        { titulo: 'Ganancias', url: 'reportes-ganancias' },
        { titulo: 'Especializaciones', url: 'reportes-especializaciones' },
      ]
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-user',
      url: 'usuarios',
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

  public searchItem(searchParam: string) {
    let menu = this.menu;
    let responseItem: { titulo: string, url: string }[] = [];
    menu.forEach(itemMenu => {

      if (itemMenu.submenu.length > 0) {
        let subMenuArr: any[] = itemMenu.submenu;
        subMenuArr.forEach(sub => {
          let titulo: string = sub.titulo;
          if (titulo.toLowerCase().includes(searchParam.toLocaleLowerCase())) {
            responseItem.push({ titulo: sub.titulo, url: sub.url });
          }
        });
      } else {
        let titulo: string = itemMenu.titulo;
        if (titulo.toLowerCase().includes(searchParam.toLocaleLowerCase())) {
          responseItem.push({ titulo: itemMenu.titulo, url: itemMenu.url });
        }
      }
    })
    return responseItem;
  }


  /*   const navs = document.getElementsByClassName("nav-link nav-event");
  for (let index = 0; index < navs.length; index++) {
    console.log(navs[index]);
    console.log(navs[index].eventListeners?.bind);
 
  } */
}
