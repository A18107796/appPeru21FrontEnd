import { Component, OnInit } from '@angular/core';
import { Especializacion } from 'src/app/models/especializacion';
import { EspecializacionService } from 'src/app/services/especializacion.service';

@Component({
  selector: 'app-especializaciones',
  templateUrl: './especializaciones.component.html',
  styles: [
  ]
})
export class EspecializacionesComponent implements OnInit {

  especializaciones: Especializacion[] = [];
  constructor(private especializacionService: EspecializacionService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.especializacionService.getEspecializaciones().subscribe(res => {
      this.especializaciones = res;
      console.log(this.especializaciones);
      
      
    })
  }

}
