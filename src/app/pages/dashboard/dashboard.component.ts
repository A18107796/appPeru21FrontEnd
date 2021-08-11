import { Component, OnInit } from '@angular/core';
import { CountEntity } from 'src/app/enums/count-entity';
import { Estado } from 'src/app/enums/estado';
import { Usuario } from 'src/app/models/usuario';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  estudiantes: number = 0;
  empleados: number = 0;
  matriculas: number = 0;
  ganancias: number = 0.0;
  usuarios: Usuario[] = [];

  dataInfo: { name: string, value: any }[] = [];

  view: [number, number] = [500, 400];

  cardColor: string = '#232837';
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dashboardS: DashboardService, private usuarioService: UsuarioService) {
    /*    Object.assign(this, { single }); */
  }
  ngOnInit() {
    this.getCountStudents();
    this.getUsuarios();

  }

  getUsuarios() {
    this.usuarioService.listar().subscribe(
      res => {
        this.usuarios = res;
      }
    )
  }

  onSelect(event: any) {
    console.log(event);
  }


  getCountStudents() {
    this.dashboardS.getCountEntity(CountEntity.estudiantes).subscribe(
      res2 => {
        console.log(res2);
        this.estudiantes = res2.total;
        this.getCountEmpleados();
      }
    )
  }

  getCountEmpleados() {
    this.dashboardS.getCountEntity(CountEntity.empleados).subscribe(
      res3 => {
        console.log(res3);
        this.empleados = res3.total;
        this.getCountMatriculas();
      }
    )
  }
  getGanancias() {

    this.dashboardS.getGanancias().subscribe(
      res => {
        this.ganancias = res.ganancias;
        this.setData();
      })

  }

  getCountMatriculas() {

    this.dashboardS.getCountEntity(CountEntity.matriculas).subscribe(
      res1 => {
        console.log(res1);
        this.matriculas = res1.total;
        this.getGanancias();
      }
    )
  }

  setData() {
    this.dataInfo.push({ name: "empleados", value: this.empleados });
    this.dataInfo.push({ name: "estudiantes", value: this.estudiantes });
    this.dataInfo.push({ name: "matriculas", value: this.matriculas });
    this.dataInfo.push({ name: "ganancias", value: this.ganancias });
  }



}
