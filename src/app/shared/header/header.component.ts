import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from 'src/app/pages/pages.routing';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from '../../enums/theme'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  theme: Theme = Theme.Light;
  public valueSearch: string = "";
  public classTheme = document.querySelector('#div-mode-selector');
  constructor(public themeService: ThemeService, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.theme = this.themeService.globalTheme;
  }

  setSearch(event: any) {
    this.valueSearch = event.target.value;
  }

  search() {
    this.router.navigate(['/sistema/buscar',this.valueSearch])
    
  }



  changeTheme() {
    this.themeService.changeTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
