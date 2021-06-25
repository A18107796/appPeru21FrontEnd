import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  public titulo: string;
  constructor() { 
    this.titulo = "NUEVO EMPLEADO";
  }

  ngOnInit(): void {
  }

}
