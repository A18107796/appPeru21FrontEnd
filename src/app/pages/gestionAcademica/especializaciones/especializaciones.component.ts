import { Component, OnInit } from '@angular/core';
import { Especializacion } from 'src/app/models/especializacion';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-especializaciones',
  templateUrl: './especializaciones.component.html',
  styles: [
  ]
})
export class EspecializacionesComponent implements OnInit {
  table!: any;
  especializaciones: Especializacion[] = [];
  constructor(
    private especializacionService: EspecializacionService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.listar();

  }

  listar() {
    this.especializacionService.getEspecializaciones().subscribe(res => {
      this.especializaciones = res;
      this.createDataTable();


    })
  }

  abrirModal(): void {
    this.modalService.abrirModal();
  }


  updateList(event: any) {
    this.deleteTable();
    this.listar();
  }

  delete(id: Number) {
    console.log("ELIMINAR CLICK: " + id);

    Swal.fire({
      title: 'ELIMINAR',
      text: "Desea eliminar la especializacion id: " + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especializacionService.delete(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado',
              'Especializacion eliminada.',
              'success'
            )
            this.deleteTable();
            this.listar();
          },
          err => {
            Swal.fire(
              'Error',
              'Mensaje:' + err,
              'error'
            )
          }
        )

      }
    })
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

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }

}
