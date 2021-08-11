import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { Estado } from 'src/app/enums/estado';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaPagos } from 'src/app/models/matricula-pagos';
import { MatriculaPagoService } from 'src/app/services/matricula-pago.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { PagoService } from 'src/app/services/pago.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma-pagos-estudiante',
  templateUrl: './cronograma-pagos-estudiante.component.html',
  styleUrls: ['./cronograma-pagos-estudiante.component.css']
})
export class CronogramaPagosEstudianteComponent implements OnInit {
  public matriculas: Matricula[] = [];
  public matriculaSelected: Matricula = new Matricula();
  public pagosToSend: Map<number, { pago: MatriculaPagos, checked: boolean }> = new Map();
  public date!: Date | null;
  public total = 0.0;
  public totalPendiente = 0.0;
  public value = 5;
  public percent = 0;
  public cantidad = 0;
  constructor(private mS: MatriculaService, private router: Router, private location: Location, private aR: ActivatedRoute,
    private mPagoService: MatriculaPagoService, private pagoS: PagoService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }

  change(event: any) {
    const id = event.target.selectedOptions[0].dataset.value;
    this.total = 0.0;
    this.totalPendiente = 0.0;
    this.setMatriculaSelected(id);
  }


  setMatriculaSelected(id: number | null) {

    if (id) {
      let matricula: Matricula = this.matriculas.filter(m => {
        return m.periodo.id == id;
      })[0];
      this.matriculaSelected = matricula;
    } else {
      this.matriculaSelected = this.matriculas[0];
    }
    
    this.matriculaSelected.pagos.forEach(p => {
      this.total += p.pension.monto;
      if (p.estado === Estado.PENDIENTE) {
        this.totalPendiente += p.pension.monto;
      }
    })
    this.getPercent();
    this.getDate();
  }

  changeSelected(event: any, p: MatriculaPagos) {
    const status = event.target.checked;
    const value = event.target.value;

    if (status) {
      this.pagosToSend.set(p.id, { pago: p, checked: status });
    } else {
      this.pagosToSend.delete(p.id);
    }
    console.log(this.pagosToSend);
  }

  enabled(index: number, id: number): boolean {
    if (this.matriculaSelected.pagos[index].estado === Estado.PAGADO) {
      return true;
    } else {
      return false;
    }
  }

  enviarDisabled(): boolean {
    if (this.pagosToSend.size > 0) {
      return false;
    } else {
      return true;
    }
  }

  anularMatricula() {
    if (this.matriculaSelected) {
      this.mS.changeStatus(this.matriculaSelected, Estado.ANULADO).subscribe(
        res => {
          Swal.fire({
            title: 'Matricula Anulada',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hecho'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
      );
    }
  }

  mostrarBoton(): boolean {
    if (this.matriculaSelected.estado === Estado.ANULADO) {
      return false;
    } else {
      let cont = 0;
      this.matriculaSelected.pagos.forEach(res => {
        if (res.estado == Estado.VENCIDO) {
          cont += 1;
        }
      })

      if (cont > 8) {
        return true;
      } else {
        return false;
      }
    }

  }

  getDate() {
    this.mPagoService.getCercanPago(this.matriculaSelected.id, Estado.PENDIENTE).subscribe(
      res => {
        if (res.mensaje) {
          this.date = null;
        } else {
          let pago: MatriculaPagos = res.pago;
          this.date = pago.fecha_venc;
        }
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  enviar() {
    let matriculaToSend: Matricula = new Matricula();
    matriculaToSend.estudiante = this.matriculaSelected.estudiante;
    matriculaToSend.especializacion = this.matriculaSelected.especializacion;
    matriculaToSend.pagos = [];
    this.pagosToSend.forEach(value => {
      if (value.checked) {
        matriculaToSend.pagos.push(value.pago);
      }
    })

    if (matriculaToSend.pagos.length > 0) {
      this.pagoS.sendMatricula(matriculaToSend);
      this.router.navigate(['/sistema/pagos-inicio/pagar']);
    }
  }

  getPercent() {
    let total: number = 0.0;
    this.matriculaSelected.pagos.forEach(element => {
      if (element.estado === Estado.PAGADO) {
        total += element.pension.monto;
      }
    });
    if (this.total > 0) {
      this.percent = (total / this.total) * 100;
    }
  }



  getMatriculas() {
    this.aR.params.subscribe(
      params => {
        let dni = params['dni'] as string;
        if (dni && dni.length >= 8 && dni.length <= 11) {
          this.mS.getMatriculaByStudentDNI(dni).subscribe(
            res => {
              this.matriculas = res;
              this.setMatriculaSelected(null);
            },
            err => {
              Swal.fire('Error', err.error.message, 'error');
              this.router.navigateByUrl("/sistema/pagos-inicio");
            }
          )
        } else {
          Swal.fire('Error', "El parametro de busqueda no es valido.", 'error');
          this.router.navigateByUrl("/sistema/pagos-inicio");
        }
      }
    )
  }

}
