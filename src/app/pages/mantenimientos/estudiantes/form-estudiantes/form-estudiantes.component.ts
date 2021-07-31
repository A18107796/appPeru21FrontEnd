import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { Distrito } from 'src/app/models/distrito';
import { Estudiante } from 'src/app/models/estudiante';
import { Provincia } from 'src/app/models/provincia';
import { Sede } from 'src/app/models/sede';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { FormsService } from 'src/app/services/forms.service';
import { SedeService } from 'src/app/services/sede.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MyValidation } from 'src/app/Validators/my-validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estudiantes',
  templateUrl: './form-estudiantes.component.html',
  styleUrls: ['./form-estudiantes.component.css']
})
export class FormEstudiantesComponent implements OnInit {
  public titulo = "Crear Estudiante"
  public formSubmited = false;
  estudiante: Estudiante = new Estudiante();
  public spinnerDNI = false;
  formEstudiante!: FormGroup;
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  tipos: TipoDocumento[] = [];
  sedes: Sede[] = [];
  constructor(private _formB: FormBuilder, private _estS: EstudianteService, public _fs: FormsService, private _ubicacionService: UbicacionService, private activatedRouter: ActivatedRoute,
    private location: Location, private sedeService: SedeService) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getTipoDocumento();
    this.getSedes();
    this.createFormEmpleado();
    this.getEmpleado();
  }


  getEmpleado() {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id'];
        if (id && id > 0) {
          this._estS.getEntity(id).subscribe(
            res => {
              this.estudiante = new Estudiante();
              this.estudiante = res.estudiante;
              this.mapForm();
            },
            err => {
              this.location.back();
            }
          )
        }

      }
    )
  }




  getDepartamentos() {
    this._ubicacionService.getDepartamentos().subscribe(
      res => {
        this.departamentos = res;
      }
    )
  }

  getSedes() {
    this.sedeService.listar().subscribe(
      res => {
        this.sedes = res;
      }
    )
  }

  getTipoDocumento() {
    this._ubicacionService.getTipo_Documentos().subscribe(
      res => {
        this.tipos = res;
      }
    )
  }

  getProvinciasById(id: number) {
    this._ubicacionService.getProvinciasByIDDep(id).subscribe(
      res => {
        this.provincias = res;
      }
    )
  }


  getDistritosById(id: number) {
    this._ubicacionService.getDistritosByIdProv(id).subscribe(
      res => {
        this.distritos = res;
      }
    )
  }


  createFormEmpleado() {
    this.formEstudiante = this._formB.group({
      nombres: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      apellidos: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      tipo_documento: [null, [Validators.required]],
      num_doc: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
      estado_civil: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      fecha_nac: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], MyValidation.existsEmailStudent(this._estS)],
      direccion: [null, [Validators.required]],
      telefono: [null, [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9,$]*$')]],
      distrito: [{ value: null, disabled: true }, [Validators.required]],
      provincia: [{ value: null, disabled: true }, [Validators.required]],
      departamento: [null, [Validators.required]],
      sede: [null, [Validators.required]],
    })
  }

  mapForm() {
    this.titulo = "Modificar Estudiante";
    if (this.estudiante.id) {
      this.formEstudiante.get('nombres')?.setValue(this.estudiante.nombres);
      this.formEstudiante.get('apellidos')?.setValue(this.estudiante.apellidos);
      this.formEstudiante.get('tipo_documento')?.setValue(this.estudiante.tipo_documento);
      this.formEstudiante.get('tipo_documento')?.disable();
      this.formEstudiante.get('num_doc')?.setValue(this.estudiante.num_doc);
      this.formEstudiante.get('genero')?.setValue(this.estudiante.genero);
      this.formEstudiante.get('estado_civil')?.setValue(this.estudiante.estado_civil);
      this.formEstudiante.get('fecha_nac')?.setValue(this.estudiante.fecha_nac);
      this.formEstudiante.get('telefono')?.setValue(this.estudiante.telefono);
      this.formEstudiante.get('email')?.setValue(this.estudiante.email);
      this.formEstudiante.get('email')?.disable();
      this.formEstudiante.get('departamento')?.setValue(this.estudiante.distrito.provincia.departamento);
      this.getProvinciasById(this.estudiante.distrito.provincia.departamento.id);
      this.formEstudiante.get('provincia')?.enable();
      this.formEstudiante.get('provincia')?.setValue(this.estudiante.distrito.provincia);
      this.getDistritosById(this.estudiante.distrito.provincia.id);
      this.formEstudiante.get('distrito')?.enable();
      this.formEstudiante.get('distrito')?.setValue(this.estudiante.distrito);

      this.formEstudiante.get('direccion')?.setValue(this.estudiante.direccion);
      this.formEstudiante.get('sede')?.setValue(this.estudiante.sede);
      this.formEstudiante.get('sede')?.disable();


    }
  }


  submit() {
    this.formSubmited = true;

    if (this.formEstudiante.valid && this.formSubmited) {
      if (this.estudiante && this.estudiante.id) {
        this.update();
      } else {
        this.estudiante = new Estudiante();
        this.mapEmpleado();
        this.save();
      }
    }
  }
  update() {
    if (this.estudiante.id) {
      let id = this.estudiante.id
      let email = this.estudiante.email;
      let tipo_doc = this.estudiante.tipo_documento;
      let dni = this.estudiante.num_doc;
      let sede = this.estudiante.sede;
      this.mapEmpleado();
      this.estudiante.id = id;
      this.estudiante.email = email;
      this.estudiante.tipo_documento = tipo_doc;
      this.estudiante.num_doc = dni;
      this.estudiante.sede = sede;
      this._estS.update(this.estudiante).subscribe(
        res => {
          Swal.fire('Listo', 'Estudiante Actualizado Correctamente', 'success');
          this.location.back();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  existsUniqueCampDNI(value: any) {
    if (this.formEstudiante.get('num_doc')?.valid) {
      this.spinnerDNI = true;
      setTimeout(() => {
        this._estS.verifyDNI(value.target.value).subscribe(
          res => {
            const existe = res.existe;
            if (existe) {
              this.spinnerDNI = false;
              this.formSubmited = true;
              this.formEstudiante.get('num_doc')?.setErrors({ 'duplicate': true });
            } else {
              this.spinnerDNI = false;
            }
          }
        )
      }, 1000)
    }
  }


  activeNumDoc() {
    if (this.formEstudiante.get('tipo_documento')?.value) {
      this.formEstudiante.get('num_doc')?.enable();
    } else {
      this.formEstudiante.get('num_doc')?.disable();
      this.formEstudiante.get('num_doc')?.setValue(null);
    }
  }

  mapEmpleado() {
    this.estudiante = this.formEstudiante.value;

  }

  save() {

    Swal.fire({
      title: '¿Los datos son correctos?',
      text: "Verifique los datos antes de proceder, recuerda que la SEDE, EMAIL y DNI no se puede modificar despues de haberse creado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Verificar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._estS.create(this.estudiante).subscribe(
          res => {
            Swal.fire('Listo', 'Estudiante creado correctamente', 'success');
            this.location.back();
          },
          err => {

            Swal.fire({
              title: 'Ocurrio un error :(',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',

            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }

            })


          }
        )
      }
    })

  }

  activeUbicacion(campo: string) {
    if (campo === 'provincia') {
      if (this.formEstudiante.get('departamento')?.value) {
        const value = this.formEstudiante.get('departamento')?.value;
        this.formEstudiante.get(campo)?.enable();
        this.getProvinciasById(value.id);
        this.formEstudiante.get('provincia')?.setValue(null);
      } else {
        this.formEstudiante.get(campo)?.setValue(null);
        this.formEstudiante.get(campo)?.disable();
        this.provincias = [];
      }
    } else if (campo === 'distrito') {
      const value = this.formEstudiante.get('provincia')?.value;
      if (value) {
        this.formEstudiante.get(campo)?.enable();
        this.getDistritosById(value.id);
        this.formEstudiante.get('distrito')?.setValue(null);
      } else {
        this.formEstudiante.get(campo)?.setValue(null);
        this.formEstudiante.get(campo)?.disable();
        this.distritos = [];
      }
    }
  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
