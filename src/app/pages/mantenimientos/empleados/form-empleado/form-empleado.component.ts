import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Departamento } from 'src/app/models/departamento';
import { Distrito } from 'src/app/models/distrito';
import { Empleado } from 'src/app/models/empleado';
import { Provincia } from 'src/app/models/provincia';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormsService } from 'src/app/services/forms.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MyValidation } from 'src/app/Validators/my-validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  public titulo: string;
  public departamentos: Departamento[] = [];
  public provincias: Provincia[] = [];
  public distritos: Distrito[] = [];
  public tipos: TipoDocumento[] = [];
  public formSubmited = false;
  public inputDNI = false;
  public spinnerDNI = false;
  public empleado!: Empleado;
  public formEmpleado!: FormGroup;
  public cargos: Cargo[] = [];
  constructor(
    private _empS: EmpleadoService, private _ubicacionService: UbicacionService,
    private _formB: FormBuilder, public _fs: FormsService, private location: Location,
    private activatedRoute: ActivatedRoute) {

    this.titulo = "NUEVO EMPLEADO";
  }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getTipoDocumento();
    this.getCargos();
    this.createFormEmpleado();
    this.getEmpleado();

  }

  getEmpleado() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id && id > 0) {
          this._empS.getEntity(id).subscribe(
            res => {
              this.empleado = new Empleado();
              this.empleado = res.empleado;
              console.log(this.empleado);
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

  getCargos() {
    this._empS.getCargos().subscribe(
      res => {
        this.cargos = res;
      }
    )
  }

  createFormEmpleado() {
    this.formEmpleado = this._formB.group({
      nombres: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      apellidos: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      tipo_documento: [null, [Validators.required]],
      num_doc: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
      estado_civil: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      fecha_nac: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], MyValidation.existsEmail(this._empS)],
      direccion: [null, [Validators.required]],
      telefono: [null, [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9,$]*$')]],
      distrito: [{ value: null, disabled: true }, [Validators.required]],
      provincia: [{ value: null, disabled: true }, [Validators.required]],
      departamento: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
    })
  }

  mapForm() {
    this.titulo =  "Modificar Empleado";
    if (this.empleado.id) {
      this.formEmpleado.get('nombres')?.setValue(this.empleado.nombres);
      this.formEmpleado.get('apellidos')?.setValue(this.empleado.apellidos);
      this.formEmpleado.get('tipo_documento')?.setValue(this.empleado.tipo_documento);
      this.formEmpleado.get('tipo_documento')?.disable();
      this.formEmpleado.get('num_doc')?.setValue(this.empleado.num_doc);
      this.formEmpleado.get('genero')?.setValue(this.empleado.genero);
      this.formEmpleado.get('estado_civil')?.setValue(this.empleado.estado_civil);
      this.formEmpleado.get('fecha_nac')?.setValue(this.empleado.fecha_nac);
      this.formEmpleado.get('telefono')?.setValue(this.empleado.telefono);
      this.formEmpleado.get('email')?.setValue(this.empleado.email);
      this.formEmpleado.get('email')?.disable();
      this.formEmpleado.get('departamento')?.setValue(this.empleado.distrito.provincia.departamento);
      this.getProvinciasById(this.empleado.distrito.provincia.departamento.id);
      this.formEmpleado.get('provincia')?.enable();
      this.formEmpleado.get('provincia')?.setValue(this.empleado.distrito.provincia);
      this.getDistritosById(this.empleado.distrito.provincia.id);
      this.formEmpleado.get('distrito')?.enable();
      this.formEmpleado.get('distrito')?.setValue(this.empleado.distrito);

      this.formEmpleado.get('direccion')?.setValue(this.empleado.direccion);
      this.formEmpleado.get('cargo')?.setValue(this.empleado.cargo);
      this.formEmpleado.get('cargo')?.disable();


    }
  }

  submit() {
    this.formSubmited = true;

    if (this.formEmpleado.valid && this.formSubmited) {
      if (this.empleado && this.empleado.id) {
        console.log("update");
        console.log(this.empleado.id);
        this.update();
      } else {
        this.empleado = new Empleado();
        this.mapEmpleado();
        this.save();
      }
    }
  }
  update() {
    if (this.empleado.id) {
      let id = this.empleado.id
      let email = this.empleado.email;
      let tipo_doc = this.empleado.tipo_documento;
      let dni = this.empleado.num_doc;
      let cargo = this.empleado.cargo;
      this.mapEmpleado();
      this.empleado.id = id;  
      this.empleado.email = email;
      this.empleado.tipo_documento = tipo_doc;
      this.empleado.num_doc = dni;
      this.empleado.cargo = cargo;
      this._empS.update(this.empleado).subscribe(
        res => {
          console.log(res);
          
          Swal.fire('Listo', 'Empleado Actualizado Correctamente', 'success');
          this.location.back();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  existsUniqueCampDNI(value: any) {
    if (this.formEmpleado.get('num_doc')?.valid) {
      this.spinnerDNI = true;
      setTimeout(() => {
        this._empS.verifyDNI(value.target.value).subscribe(
          res => {
            const existe = res.existe;
            if (existe) {
              this.spinnerDNI = false;
              this.formSubmited = true;
              this.formEmpleado.get('num_doc')?.setErrors({ 'duplicate': true });

            } else {
              this.spinnerDNI = false;
            }
          }
        )
      }, 1000)
    }
  }


  activeNumDoc() {
    if (this.formEmpleado.get('tipo_documento')?.value) {
      this.formEmpleado.get('num_doc')?.enable();
    } else {
      this.formEmpleado.get('num_doc')?.disable();
      this.formEmpleado.get('num_doc')?.setValue(null);
    }
  }

  mapEmpleado() {
    this.empleado = this.formEmpleado.value;
    console.log(this.empleado.nombres);
    console.log(this.empleado);

  }

  save() {
    this._empS.create(this.empleado).subscribe(
      res => {
        console.log(res);
        Swal.fire('Listo', 'Empleado creado correctamente, informe al nuevo empleado de sus datos para acceder al sistema.', 'success');
        this.location.back();
      },
      err => {
        Swal.fire('Error', 'Parece que ocurrio un error interno, intenedelo de nuevo.', 'error');
        console.log(err);
        window.location.reload();

      }
    )
  }

  activeUbicacion(campo: string) {
    if (campo === 'provincia') {
      if (this.formEmpleado.get('departamento')?.value) {
        const value = this.formEmpleado.get('departamento')?.value;
        this.formEmpleado.get(campo)?.enable();
        this.getProvinciasById(value.id);
        this.formEmpleado.get('provincia')?.setValue(null);
      } else {
        this.formEmpleado.get(campo)?.setValue(null);
        this.formEmpleado.get(campo)?.disable();
        this.provincias = [];
      }
    } else if (campo === 'distrito') {
      const value = this.formEmpleado.get('provincia')?.value;
      if (value) {
        this.formEmpleado.get(campo)?.enable();
        this.getDistritosById(value.id);
        this.formEmpleado.get('distrito')?.setValue(null);
      } else {
        this.formEmpleado.get(campo)?.setValue(null);
        this.formEmpleado.get(campo)?.disable();
        this.distritos = [];
      }
    }
  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
