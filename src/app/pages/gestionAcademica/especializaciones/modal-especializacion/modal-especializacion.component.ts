import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sample } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Especializacion } from 'src/app/models/especializacion';
import { EspecializacionTipo } from 'src/app/models/especializacion-tipo';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { FormsService } from 'src/app/services/forms.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-especializacion',
  templateUrl: './modal-especializacion.component.html',
  styleUrls: ['./modal-especializacion.component.css']
})
export class ModalEspecializacionComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  public formSubmited = false;
  especializacion!: Especializacion;
  selectEspecializaciones: EspecializacionTipo[] = [];
  formEspecializacion!: FormGroup;
  constructor(
    public modalService: ModalService,
    private especializacionService: EspecializacionService,
    public _fs: FormsService,
    private formBuild: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.createFormEspecializacion();
    this.listarEspecializacionesTipo();
  }


  cerrarModal() {
    this.modalService.cerrarModal();
  }

  listarEspecializacionesTipo() {
    this.especializacionService.getTipoEspecializaciones().subscribe(res => {
      this.selectEspecializaciones = res;
    })

  }

  createFormEspecializacion() {
    this.formEspecializacion = this.formBuild.group({
      nombre: [null, [Validators.required]],
      tipo: [null, [Validators.required]]
    })
  }


  submit() {
    this.formSubmited = true;
    if (this.formEspecializacion.valid) {
      this.mapEspecializacion();
      this.registrarEspecializacion();
    }

  }

  mapEspecializacion() {
    this.especializacion = new Especializacion();
    this.especializacion.nombre = this.formEspecializacion.get('nombre')?.value;
    this.especializacion.tipo_especializacion = this.formEspecializacion.get('tipo')?.value;
  }

  registrarEspecializacion() {
    if (this.especializacion != null) {
      this.especializacion.estado = Estado.ACTIVO;
      this.especializacionService.create(this.especializacion).subscribe(
        res => {
          Swal.fire({
            title: 'Guardado',
            text: "¿Desea agregar cursos a la especializacion registrada?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['sistema/especializaciones/edit', res.id])
            }
          })
          this.cerrarModal();
          this.myEvent.emit(null);

        },
        err => {
          console.log(err);

        }
      )
    }
  }


}
