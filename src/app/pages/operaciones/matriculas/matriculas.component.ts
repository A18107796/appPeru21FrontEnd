import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Especializacion } from 'src/app/models/especializacion';
import { Estudiante } from 'src/app/models/estudiante';
import { Matricula } from 'src/app/models/matricula';
import { Periodo } from 'src/app/models/periodo';
import { Sede } from 'src/app/models/sede';
import { AuthService } from 'src/app/services/auth.service';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FormsService } from 'src/app/services/forms.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ModalService } from 'src/app/services/modal.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SedeService } from 'src/app/services/sede.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {
  public matricula: Matricula = new Matricula();
  public spinnerDNI = false;
  public formSubmited = false;
  formMatricula!: FormGroup;
  estudianteBD: Estudiante = new Estudiante();
  especializaciones: Especializacion[] = [];
  periodos: Periodo[] = [];
  sedes: Sede[] = [];

  hoy: Date = new Date();
  public dni: string = "";

  constructor(
    public formService: FormsService,
    private _fb: FormBuilder,
    private _eService: EstudianteService,
    private _mS: MatriculaService,
    private _sedeS: SedeService,
    private _espS: EspecializacionService,
    public _modalS: ModalService,
    private _periodoS: PeriodoService,
    private _toastService: ToastrService,
    private _authService: AuthService,
    private _reportS: ReportsService,
    private location: Location) { }

  ngOnInit(): void {
    this.createFormMatricula();
    this.listaEspecializaciones();
    this.listarSedes();
    this.listarPeriodos();
  }

  createFormMatricula() {
    this.formMatricula = this._fb.group({
      estudiante: this._fb.group({
        id: [{ value: null, disabled: true }, [Validators.required]],
        nombres: [{ value: null, disabled: true }, [Validators.required]],
        dni: [{ value: null, disabled: false }, [Validators.required]],
        email: [{ value: null, disabled: true }, [Validators.required]],
        telefono: [{ value: null, disabled: true }, [Validators.required]]
      }),
      especializacion: [null, [Validators.required]],
      sede: [null, [Validators.required]],
      turno: [null, [Validators.required]],
      num_cuotas: [null, [Validators.required]],
      periodo: [null, [Validators.required]],
      detalles: [null],
    })
  }

  setDNI(event: any) {
    this.dni = event.target.value;
  }

  buscar() {
    if (this.dni.length >= 8) {
      this.spinnerDNI = true;
      setTimeout(() => {
        this._eService.findEstudianteBYDNI(this.dni).subscribe(
          res => {
            this._toastService.success("Estudiante encontrado", 'Correcto');
            this.estudianteBD = res;
            this.setEstudianteBD();
            this.spinnerDNI = false;
          },
          err => {
            this._toastService.error(err.error.message, 'No encontrado');
            this.spinnerDNI = false;
            this.formMatricula.get('estudiante')?.reset();
          }
        );
      }, 1000)
    }
  }

  listaEspecializaciones() {
    this._espS.listar().pipe(
      map(esp => {
        return esp.filter(esp => {
          return esp.estado !== Estado.INACTIVO
        })
      })
    ).subscribe(
      res => {
        this.especializaciones = res;
      }
    )
  }

  listarSedes() {
    this._sedeS.listar().subscribe(
      res => {
        this.sedes = res;
      }
    )
  }

  listarPeriodos() {
    this._periodoS.getByStatus(Estado.INSCRIPCION_ABIERTA).subscribe(res => this.periodos = res);
  }


  abrirModal() {
    this._modalS.abrirModal();
  }

  setEstudianteBD() {
    this.formMatricula.get('estudiante.nombres')?.setValue(this.estudianteBD.nombres + " " + this.estudianteBD.apellidos)
    this.formMatricula.get('estudiante.dni')?.setValue(this.estudianteBD.num_doc)
    this.formMatricula.get('estudiante.telefono')?.setValue(this.estudianteBD.telefono)
    this.formMatricula.get('estudiante.email')?.setValue(this.estudianteBD.email)
  }

  disabled(): boolean {
    if (this.dni.length >= 8) {
      return false;
    } else {
      return true;
    }
  }

  setEstudianteSeleccionado(estudiante: any) {
    this.estudianteBD = estudiante;
    this.setEstudianteBD();

  }

  submit() {
    this.formSubmited = true;
    if (this.formMatricula.valid) {
      if (this._authService.isAuthenticated()) {

        this.mapMatricula();

        Swal.fire({
          title: '¿Estas seguro?',
          text: "¿Estas seguro que deseas registrar la siguiente matricula?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            this._mS.matricular(this.matricula).subscribe(
              res => {
                Swal.fire(
                  'Registrado',
                  'La matricula fue registrada correctamente.',
                  'success'
                )
                this._mS.getMatricula(res.id).subscribe(matricula => {
                  this.generatePDF(matricula.matricula);
                  this.location.back();
                })
              },
              err => {
                Swal.fire(
                  'Error',
                  err.error.message,
                  'error'
                )
              }
            )
            /*            this._mS.getMatricula(10).subscribe(matricula => {
                         this.generatePDF(matricula.matricula);
                         this.location.back();
                       }) */
          }
        })
      }

    }
  }

  mapMatricula() {
    if (this.estudianteBD) {
      this.matricula = this.formMatricula.value;
      this.matricula.estudiante = this.estudianteBD;
      this.matricula.empleado = this._authService.usuario.empleado
      console.log(this._authService.usuario);
    }
  }

  generatePDF(matricula: Matricula) {
    console.log("Generando");
    let docDefinition = this._reportS.getFichaMatriculaPDF(matricula);
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }

}
