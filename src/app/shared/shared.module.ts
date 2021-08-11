import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    BreadcrumsComponent,
    SidebarComponent,
    HeaderComponent,
    ControlSidebarComponent,
    FooterComponent,
  ],
  exports: [
    BreadcrumsComponent,
    SidebarComponent,
    HeaderComponent,
    ControlSidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
