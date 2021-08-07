import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaPagos } from 'src/app/models/matricula-pagos';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-cronograma-pagos-estudiante',
  templateUrl: './cronograma-pagos-estudiante.component.html',
  styleUrls: ['./cronograma-pagos-estudiante.component.css']
})
export class CronogramaPagosEstudianteComponent implements OnInit {
  public matriculas: Matricula[] = [];
  public matriculaSelected: Matricula = new Matricula();
  public pagosToSend: Map<number, { pago: MatriculaPagos, checked: boolean }> = new Map();
  constructor(private mS: MatriculaService, private router: Router, private location: Location, private aR: ActivatedRoute) { }

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
    if (index === 0) {
      return false;
    } else {
      let before = this.matriculaSelected.pagos[index - 1];
      let enabled = this.pagosToSend.get(before.id)?.checked;
      if (enabled) {
        return false;
      } else {
        return true
      }
    }

  }

  enviar() {
    console.log(this.pagosToSend);
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
