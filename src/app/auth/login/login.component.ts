import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmited: boolean = false;
  usuario: Usuario;
  formLogin!: FormGroup;
  constructor(
    private router: Router,
    public formService: FormsService,
    private authService: AuthService,
    private formBuild: FormBuilder
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['sistema']);
    }
    this.createFormLogin();
  }


  createFormLogin(): void {
    this.formLogin = this.formBuild.group({
      email: ['cerron_campos@hotmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required]
    });
  }

  login() {
    this.formSubmited = true;
    if (this.formLogin.valid) {
      this.usuario.email = this.formLogin.get('email')?.value;
      this.usuario.password = this.formLogin.get('password')?.value;

      this.authService.login(this.usuario).subscribe(
        res => {
          this.authService.guardarToken(res.access_token);
          this.authService.guardarUsuario(res.access_token);
          this.router.navigate(['sistema']);
        },
        err => {
          Swal.fire(err.error.error, err.error.error_description, 'error');
        }
      )

    }
  }

}
