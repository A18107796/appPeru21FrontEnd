import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { Estado } from 'src/app/enums/estado';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaPagos } from 'src/app/models/matricula-pagos';
import { MatriculaPagoService } from 'src/app/services/matricula-pago.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { PagoService } from 'src/app/services/pago.service';
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
  public date!: Date;
  public total = 0.0;
  public totalPendiente = 0.0;
  public value = 5;
  public percent = 0;
  constructor(private mS: MatriculaService, private router: Router, private location: Location, private aR: ActivatedRoute,
    private mPagoService: MatriculaPagoService, private pagoS: PagoService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }



  setMatriculaSelected(id: number | null) {
    if (id) {
      this.matriculaSelected = this.matriculas.filter(m => m.periodo.id === id)[0];
    } else {
      this.matriculaSelected = this.matriculas[0];
    }
    console.log(this.matriculaSelected);
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

  getDate() {
    this.mPagoService.getCercanPago(this.matriculaSelected.id, Estado.PENDIENTE).subscribe(
      res => {
        let pago: MatriculaPagos = res;
        this.date = pago.fecha_venc;
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
              this.matriculaSelected.pagos.forEach(p => {
                this.total += p.pension.monto
                if (p.estado === Estado.PENDIENTE) {
                  this.totalPendiente += p.pension.monto;
                }
              });
              this.getPercent();
              this.getDate();
            },
            err => {
              this.router.navigateByUrl("/sistema/pagos-inicio");
            }
          )
        } else {
          this.location.back();
        }
      }
    )
  }

}
