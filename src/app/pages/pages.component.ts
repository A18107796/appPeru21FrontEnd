import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router) { 
    if(!authService.isAuthenticated()){
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.themeService.setLocalTheme();
  }

  

}



