import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-estudiantes',
  templateUrl: './modal-estudiantes.component.html',
  styleUrls: ['./modal-estudiantes.component.css']
})
export class ModalEstudiantesComponent implements OnInit {
  public estudiantes: Estudiante[] = [];
  public search: string = "";

  @Output() estudianteSeleccionado = new EventEmitter<Estudiante>();

  constructor(private _estService: EstudianteService, public modalService: ModalService) { }

  ngOnInit(): void {
    this._estService.listar()
      .pipe(
        map(
          res => {
            return res.filter( e => e.estado !== Estado.INACTIVO);
          }
        )
      ).subscribe(res => this.estudiantes = res);

  }

  onSearchStudent(value: any) {
    this.search = value;
  }

  enviarEstudiante(estudiante: Estudiante) {
    if (estudiante) {
      this.estudianteSeleccionado.emit(estudiante);
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }
}
