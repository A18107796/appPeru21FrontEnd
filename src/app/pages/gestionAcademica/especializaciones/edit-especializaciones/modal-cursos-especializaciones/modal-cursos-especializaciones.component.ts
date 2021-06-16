import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-cursos-especializaciones',
  templateUrl: './modal-cursos-especializaciones.component.html',
  styleUrls: ['./modal-cursos-especializaciones.component.css']
})
export class ModalCursosEspecializacionesComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
