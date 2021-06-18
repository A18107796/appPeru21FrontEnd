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
  @Output('cursoSeleccionado') cursoSeleccionado = new EventEmitter<Curso[]>();
  constructor(public modalService: ModalService, private sC: CursoService) { }
  cursos: Curso[] = [];
  key: Map<number, Curso> = new Map();


  ngOnInit(): void {
    this.sC.emitCursos.subscribe(listaCursos => {
      console.log(listaCursos);
      this.cursos = listaCursos;
    })
  }




  enviarLista() {
    let cursosLista: Curso[] = [];
    this.key.forEach((value, key) => {
      cursosLista.push(value);
    })
    this.cursoSeleccionado.emit(cursosLista);
    this.cerrarModal();

  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.key = new Map();
  }

  setOption(obj: Curso, evt: any) {
    let id = evt.target.id;
    if (evt.target.checked) {
      this.key.set(id, obj);

    } else {
      this.key.delete(id)
    }




  }





}
