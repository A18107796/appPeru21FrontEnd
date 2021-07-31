import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/enums/estado';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];


  constructor(private empService: EmpleadoService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.empService.listar().subscribe(res => {
      this.empleados = res;
      this.createDataTable();
    })
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

  createDataTable() {

    $(function () {
      $("#ex1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "order": [[0,'desc']]
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
