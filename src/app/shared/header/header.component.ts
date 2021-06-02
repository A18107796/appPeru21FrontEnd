import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from '../../enums/theme'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  theme: Theme = Theme.Light;
  public classTheme = document.querySelector('#div-mode-selector');
  constructor(public themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.theme = this.themeService.globalTheme;
  }


  changeTheme() {
    this.themeService.changeTheme();
  }

}
