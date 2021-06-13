import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu: any[];
  constructor(sidebarService: SidebarService, public authService: AuthService) {
    this.menu = sidebarService.menu;
  }

  ngOnInit(): void {
    SidebarService.iniciarMenu();
  }

}
