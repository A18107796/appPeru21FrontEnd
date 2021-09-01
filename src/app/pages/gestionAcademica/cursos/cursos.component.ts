import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/enums/estado';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  public cargando = false;
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  cursos: Curso[] = [];
  constructor(
    private router: Router,
    private _sCursos: CursoService,
    private modalService: ModalService

  ) { }

  ngOnInit(): void {
    this.listar(this.activo);
  }

  listar(estado: Estado) {
    this.cursos = [];
    this.deleteTable();
    this.cargando = true;
    this._sCursos.getByStatus(estado).subscribe(res => {

      setTimeout(() => {
        this.cursos = res;
        this.cargando = false;
        this.createDataTable();
      }, 200);
    });
  }

  eliminar(curso: Curso) {
    this._sCursos.changeStatus(curso, Estado.INACTIVO).subscribe(
      res => {
        Swal.fire('Eliminado', '', 'success');
        window.location.reload();
      },
      err => {
        Swal.fire('Error:', err.error.message, 'error')
      }
    )
  }

  activar(curso: Curso) {
    this._sCursos.changeStatus(curso, Estado.ACTIVO).subscribe(
      res => {
        window.location.reload();
      },
      err => {
        Swal.fire('Error:', err.error.message, 'error')
      }
    )
  }




  inactive(curso: Curso) {
    Swal.fire({
      title: 'ELIMINAR',
      text: "¿Desea inactivar el Curso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._sCursos.changeStatus(curso, Estado.INACTIVO).subscribe(
          res => {
            window.location.reload();
          }
        )
      }
    })

  }

  abrirForm() {
    this.router.navigate(['sistema/cursos/edit']);
  }

  createDataTable() {

    $(function () {
      $("#example1").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }

}