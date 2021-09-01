import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Estado } from 'src/app/enums/estado';
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
export class EspecializacionesComponent implements OnInit, OnDestroy {
  public table!: any;
  public cargando = false;
  public especializaciones: Especializacion[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  constructor(
    private especializacionService: EspecializacionService,
    public modalService: ModalService
  ) { }
  ngOnDestroy(): void {
    this.especializaciones = [];
    this.cargando = false;
    this.deleteTable();
  }

  ngOnInit(): void {
    this.listarTipos(this.activo);

  }

  listar() {
    this.especializacionService.listar().subscribe(res => {
      this.especializaciones = [];
      this.deleteTable()
      this.cargando = true;
      setTimeout(() => {
        this.especializaciones = res;
        this.createDataTable();
        this.cargando = false;
      }, 200);
    })
  }

  abrirModal(): void {
    this.modalService.abrirModal();
  }

  listarTipos(estado: Estado) {
    this.especializacionService.getByStatus(estado).subscribe(
      res => {
        this.especializaciones = [];
        this.deleteTable()
        this.cargando = true;
        setTimeout(() => {
          this.especializaciones = res;
          this.cargando = false;
          this.createDataTable();
        }, 200)
      }
    )
  }

  inactive(esp: Especializacion) {
    Swal.fire({
      title: 'ELIMINAR',
      text: "¿Desea inactivar la especializacion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especializacionService.changeStatus(esp, Estado.INACTIVO).subscribe(
          res => {
            window.location.reload();
          }
        )
      }
    })

  }

  updateList(event: any) {
    this.deleteTable();
    this.listar();
  }
  updateStatus(esp: Especializacion, boolean: boolean) {
    if (boolean) {
      this.especializacionService.changeStatus(esp, Estado.ACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    } else {
      this.especializacionService.changeStatus(esp, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    }
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
