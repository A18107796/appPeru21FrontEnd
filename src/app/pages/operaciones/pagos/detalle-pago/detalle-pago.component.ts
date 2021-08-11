import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { totalmem } from 'os';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {
  public pago = new Pago();
  public total = 0.0;
  public cargando = true;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public pagoS: PagoService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.getPago();
  }

  anularPago() {
    if (this.pago) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Estas seguro que deseas anular este pago.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, anular'
      }).then((result) => {
        if (result.isConfirmed) {
          this.pagoS.anularPago(this.pago.id).subscribe(
            res => {
              Swal.fire('Anulado:', res.mensaje, 'success');
              this.router.navigateByUrl('/sistema/anular-pagos');
            },
            err => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
        }
      })

    }
  }

  getPago() {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id'];
        if (id && id > 0) {
          this.cargando = true
          setTimeout(() => {
            this.pagoS.getEntity(id).subscribe(
              res => {
                this.pago = res.pago;
                this.pago.pagoDetalles.forEach(p => this.total += p.subtotal)
                this.cargando = false;

              },
              err => {
                Swal.fire("Error", err.error.message, 'error');
                this.router.navigateByUrl('/sistema/matriculas')
              }
            )
          }, 1000);
        } else {
          this.router.navigateByUrl('/sistema/matriculas')
        }
      }
    )
  }



}
