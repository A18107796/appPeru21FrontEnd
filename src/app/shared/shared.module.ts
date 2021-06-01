import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';



@NgModule({
  declarations: [
    BreadcrumsComponent,
    SidebarComponent,
    HeaderComponent,
    ControlSidebarComponent,
  ],
  exports: [
    BreadcrumsComponent,
    SidebarComponent,
    HeaderComponent,
    ControlSidebarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
