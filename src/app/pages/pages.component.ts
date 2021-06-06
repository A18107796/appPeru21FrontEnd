import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.setLocalTheme();
  }

  

}



