import { Component, EventEmitter, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/enums/estado';
import { Curso } from 'src/app/models/curso';
import { Especializacion } from 'src/app/models/especializacion';
import { EspecializacionTipo } from 'src/app/models/especializacion-tipo';
import { CursoService } from 'src/app/services/curso.service';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { FormsService } from 'src/app/services/forms.service';
import { ModalService } from 'src/app/services/modal.service';
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
  myEvent = new EventEmitter<Curso[]>();
  cursosToModal!: Curso[];
  public cargando = false;
  constructor(
    private _espService: EspecializacionService,
    private toast: ToastrService,
    private a_router: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    public modalService: ModalService,
    public _fs: FormsService,
    private _cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.listarTipos();
    this.createForm();
    this.getEspecializacion();
  }

  getEspecializacion() {
    this.a_router.params.subscribe(param => {
      let id = param['id'] as number;
      if (id && id > 0) {
        this._espService.getEntity(id).subscribe(
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

  listarCursos() {
    this._cursoService.getByStatus(Estado.ACTIVO).subscribe(res => {
      this.cursosToModal = res;
      if (this.cursosToModal.length > 0) {
        this.especializacionBD.cursos.forEach(c => {
          this.cursosToModal = this.cursosToModal.filter(curso => {
            return c.id !== curso.id;
          })
        })
      }
      this._cursoService.emitCursos.emit(this.cursosToModal);
    })
  }

  removeCurso(idCurso: number) {
    console.log(idCurso);
    this.especializacionBD.cursos = this.especializacionBD.cursos.filter(c => {
      return idCurso !== c.id
    });
  }

  compareTipo(t1: EspecializacionTipo, t2: EspecializacionTipo): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  setSeleccionado(event: any[]) {
    event.forEach(curso => {
      this.especializacionBD.cursos.push(curso);
    })
  }

  abrirModal() {
    this.modalService.abrirModal();
    this.listarCursos();
  }

  mapEspecializacion() {
    let nombre = this.especializacionForm.get('especializacion')?.value;
    let tipo: any = this.especializacionForm.get('tipo')?.value;
    if (nombre !== this.especializacionBD.nombre || tipo.id !== this.especializacionBD.tipo_especializacion.id) {
      this.especializacionBD.nombre = nombre;
      this.especializacionBD.tipo_especializacion = tipo;
      this.cargando = true;
      this.toast.info('Info', 'Guardando cambios')
      setTimeout(() => {
        this._espService.update(this.especializacionBD).subscribe(
          res => {
            this._espService.saveChanges(this.especializacionBD).subscribe(
              res => {
                setTimeout(() => {
                  this.cargando = false;
                  this.toast.success('Datos guardados correctamente');
                }, 300);
              },
              err => {
                console.log(err);
                this.toast.error('Error, intentelo denuevo.');
              }
            );
          },
          err => {
            this.toast.error('Error, intentelo denuevo.');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        )
      }, 400);
    } else {
      this.cargando = true;
      this.toast.info('Info', 'Guardando cambios')
      setTimeout(() => {
        this._espService.saveChanges(this.especializacionBD).subscribe(
          res => {
            setTimeout(() => {
              this.cargando = false;
              this.toast.success('Datos guardados correctamente');
            }, 300);
          },
          err => {
            this.toast.error('Error, intentelo denuevo.');
          }
        );
      }, 400);
    }

  }

  guardar() {
    this.formSubmited = true;
    if (this.especializacionForm.valid) {
      this.mapEspecializacion();
    }
    /* this._espService.saveChanges(this.especializacionBD).subscribe(
      res => {
        console.log(res);
        this.toast.success('Datos guardados correctamente');
      },
      err => {
        console.log(err);
        this.toast.error('Error, intentelo denuevo.');
      }
    ); */
  }

}
