import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/enums/estado';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ReportsService } from 'src/app/services/reports.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  cargando = false;
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public all = Estado.ALL;
  constructor(private empService: EmpleadoService, private toast: ToastrService, private _reportS: ReportsService) { }

  ngOnInit(): void {
    this.listar(Estado.ALL);
  }

  listar(estado: Estado) {
    this.empleados = [];
    this.deleteTable();
    this.cargando = true;
    if (estado === Estado.ALL) {
      this.empService.listar().subscribe(res => {
        setTimeout(() => {
          this.empleados = res;
          this.cargando = false;
          this.createDataTable();
        }, 200);
      });
    } else {
      this.empService.getByStatus(estado).subscribe(res => {
        setTimeout(() => {
          this.empleados = res;
          this.cargando = false;
          this.createDataTable();
        }, 200);
      });
    }

  }

  createPDFStudents() {
    let doc = this._reportS.getEmpleadosPDF(this.empleados);
    this._reportS.openPDF(doc);
  }

  inactive(emp: any) {
    Swal.fire({
      title: '¿Estas seguro que deseas desactivar a este empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.changeStatus(emp, Estado.INACTIVO).subscribe(
          res => {
            this.toast.success('Empleado inactivado', 'Listo');
            window.location.reload();
          },
          err => {
            this.toast.success('Ocurrio un error, intentelo denuevo.', 'Listo');
          }
        )
      }
    })

  }

  delete(boolean: boolean, est: Empleado) {
    if (boolean) {
      this.empService.changeStatus(est, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.empService.changeStatus(est, Estado.ACTIVO).subscribe(
        res => {
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  createDataTable() {

    $(function () {
      $("#empleados").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "order": [[0, 'desc']]
      }).buttons().container().appendTo('#empleados_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#empleados').dataTable().fnDestroy();
  }

}
