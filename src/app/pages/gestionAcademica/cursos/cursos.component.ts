import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cursos: Curso[] = [];
  constructor(
    private router: Router,
    private _sCursos: CursoService,
    private modalService: ModalService

  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this._sCursos.listar().subscribe(res => {
      this.cursos = res;
      this.createDataTable();
    });
  }

  eliminar(curso: Curso) {
    this._sCursos.delete(curso.id).subscribe(
      res => {
        Swal.fire('Eliminado','','success');
      },
      err => {
        Swal.fire('Error:',err.error.message,'error')
      }
    )
  }

  abrirForm() {
    this.router.navigate(['sistema/cursos/edit']);
  }

  createDataTable() {

    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }
}