import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especializacion } from 'src/app/models/especializacion';
import { EspecializacionTipo } from 'src/app/models/especializacion-tipo';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { FormsService } from 'src/app/services/forms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-especializaciones',
  templateUrl: './edit-especializaciones.component.html',
  styleUrls: ['./edit-especializaciones.component.css']
})
export class EditEspecializacionesComponent implements OnInit {
  private formSubmited = false;
  especializacionForm!: FormGroup;
  especializacionBD!: Especializacion;
  tipos: EspecializacionTipo[] = [];
  constructor(
    private _espService: EspecializacionService,
    private toast: ToastrService,
    private a_router: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    public _fs: FormsService) { }

  ngOnInit(): void {
    this.listarTipos();
    this.createForm();
    this.getEspecializacion();
  }

  getEspecializacion() {
    this.a_router.params.subscribe(param => {
      let id = param['id'] as number;
      if (id) {
        this._espService.getEspecializacion(id).subscribe(
          res => {
            this.especializacionBD = res.especializacion;
            this.especializacionForm.get('especializacion')?.setValue(this.especializacionBD.nombre);
            this.especializacionForm.get('tipo')?.setValue(this.especializacionBD.tipo_especializacion);

          },
          err => {
            Swal.fire(err.error.exception, err.error.message + '\nRedirigiendo...', 'error');
            this.router.navigate(['sistema/especializaciones']);

          }
        )
      }
    })
  }


  listarTipos() {
    this._espService.getTipoEspecializaciones().subscribe(
      res => {
        this.tipos = res;
      }
    )
  }

  createForm() {
    this.especializacionForm = this.formB.group({
      especializacion: [null, [Validators.required]],
      tipo: [null, [Validators.required]]
    })
  }

  compareTipo(t1: EspecializacionTipo, t2: EspecializacionTipo): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
