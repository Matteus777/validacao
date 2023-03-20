import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { User } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  user: User;
  manterLogado = false;

  constructor(
    private cookies: CookieService,
    private authService: AuthService,
    private router: Router,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.manterLogado = Boolean(this.cookies.get('manterLogado'));
    if (this.manterLogado) {
      this.router.navigate(['/home']);
    }
    this.loadForm();
  }

  loadForm() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  loginRequest() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.authService.login(this.user).subscribe({
        next: (data) => {
          this.cookies.set('manterLogado', this.manterLogado.toString());
          this.router.navigate(['/home']);
        },
        error: (data) => {
          this.swalService.warning(
            'Aviso!',
            'Usuário ou Senha inválidos!',
            'Ok'
          );
        },
      });
      return;
    }
    this.swalService.warning(
      'Aviso!',
      'Preencha os campos corretamente!',
      'Ok'
    );
  }
}
