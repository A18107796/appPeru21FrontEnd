import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
declare var $: any;


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit, OnDestroy{
  public estudiantes: Estudiante[] = [];
  public subEst!: Subscription;
  constructor(private _estS: EstudianteService) { }
  ngOnDestroy(): void {
    console.log("DESTRUIDO");
    this.subEst.unsubscribe()
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.subEst = this._estS.listar().subscribe(
      res => {
        this.estudiantes = res;
        this.createDataTable();
      }
    )
  }





  createDataTable() {

    $(function () {
      $("#estudiantes").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#estudiantes_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#estudiantes').dataTable().fnDestroy();
  }

}
