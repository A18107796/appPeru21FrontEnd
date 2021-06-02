import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
declare var jQuery: any;
declare var $: any;

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
    const asd = document.querySelector('#followClick');
    console.log("asd");
  


  }

}



