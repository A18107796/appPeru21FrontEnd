import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-cursos-especializaciones',
  templateUrl: './modal-cursos-especializaciones.component.html',
  styleUrls: ['./modal-cursos-especializaciones.component.css']
})
export class ModalCursosEspecializacionesComponent implements OnInit {
  @Output('cursoSeleccionado') cursoSeleccionado = new EventEmitter();
  constructor(public modalService: ModalService, private sC: CursoService) { }
  cursos: Curso[] = [];
  ngOnInit(): void {
    this.sC.emitCursos.subscribe(listaCursos => {
      console.log(listaCursos);
      this.cursos = listaCursos;
    })
  }


  enviarCurso(curso: Curso) {
    this.cursoSeleccionado.emit(curso);
  }





}
