import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-anular-pago',
  templateUrl: './anular-pago.component.html',
  styleUrls: ['./anular-pago.component.css']
})
export class AnularPagoComponent implements OnInit {
  public hoy = new Date();
  public pagos: Pago[] = [];
  public cargando = false;
  constructor(
    public pagoService: PagoService
  ) { }


  ngOnInit(): void {
    this.listar();

  }

  anularPago(id: number) {

    Swal.fire({
      title: '¿Desea anular este pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, anular'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagoService.anularPago(id).subscribe(
          res => {
            window.location.reload();
          },
          err => {
            console.log(err);
          }
        )
      }
    })
  }


  listar() {
    this.deleteTable();
    this.cargando = true;
    this.pagoService.listar().subscribe(res => {
      setTimeout(() => {
        this.pagos = res;
        this.cargando = false;
        this.createDataTable();
      }, 300);


    });

  }


  createDataTable() {

    $(function () {
      $("#pagos").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
      }).buttons().container().appendTo('#pagos_wrapper .col-md-6:eq(0)');
    });

  }

  deleteTable() {
    $('#pagos').dataTable().fnDestroy();
  }





}
