import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  public recentMatriculas: Matricula[] = [];
  public dni: string = "";
  constructor(private matriculaService: MatriculaService, private router: Router, private toastService: ToastrService) {

  }

  ngOnInit(): void {
    this.getRecentMatriculas();
  }

  getRecentMatriculas() {
    this.matriculaService.getByStatus(Estado.PENDIENTE).pipe(
      map((res: any) => res.sort((a: any, b: any) => b.id - a.id))
    ).subscribe(res => {
      this.recentMatriculas = res;
      if (this.recentMatriculas.length > 0) {
        this.createDataTable();
      }

    });
  }

  submit() {
    if (this.dni.length > 7 && this.dni.length < 12) {
      this.router.navigate(['/sistema/pagos-inicio/cronograma-pagos-estudiante', this.dni]);
    } else {
      Swal.fire('Mensaje', 'Ingrese un numero de documento valido.', 'error')
    }

  }

  createDataTable() {

    $(function () {
      $("#ex1").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false, "pageLength": 1,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "order": [[0, 'desc']]
      }).buttons().container().appendTo('#ex1_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#ex1').dataTable().fnDestroy();
  }

}
