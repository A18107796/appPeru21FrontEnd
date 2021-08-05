import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/enums/estado';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { FormsService } from 'src/app/services/forms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrls: ['./form-cursos.component.css']
})
export class FormCursosComponent implements OnInit {
  formSubmited = false;
  public cargando = false;
  titulo: string = "Crear Curso";
  formCurso!: FormGroup;
  curso!: Curso;
  constructor(
    public _fs: FormsService,
    private _cService: CursoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedR: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createFormCurso();
    this.getCurso();
  }


  createFormCurso() {
    this.formCurso = this.formBuilder.group({
      curso: [null, [Validators.required]]
    })
  }

  getCurso() {
    this.activatedR.params.subscribe(params => {
      let id: number = params['id'] as number;
      if (id && id > 0) {
        this.titulo = "Modificar Curso"
        this._cService.getEntity(id).subscribe(
          res => {
            this.curso = res.curso;
            this.formCurso.get('curso')?.setValue(this.curso.nombre);

          },
          err => {
            Swal.fire(err.error.exception, err.error.message + '\n Redirigiendo...', 'error');
            this.router.navigate(['sistema/cursos']);

          }
        );
      }
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formCurso.valid) {
      this.guardarCurso();

    }
  }

  submited(event: any) {
    this.formSubmited = true;
  }

  guardarCurso() {
    if (this.curso && this.curso.id) {
      this.mapCurso();
      this.cargando = true
      this._cService.update(this.curso).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            Swal.fire({
              title: 'Correcto',
              text: "Curso actualizado correctamente",
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['sistema/cursos'])
              }
            })
          }, 1500);

        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.curso = new Curso();
      this.mapCurso();
      this.cargando = true
      this.curso.estado = Estado.ACTIVO;
      this._cService.create(this.curso).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            Swal.fire({
              title: 'Correcto',
              text: "Curso creado correctamente.",
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['sistema/cursos'])
              }
            })
          }, 1500);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  mapCurso() {
    this.curso.nombre = this.formCurso.get('curso')?.value;
  }





}
