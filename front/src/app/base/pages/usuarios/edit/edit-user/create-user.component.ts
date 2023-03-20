import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/base/models/usuario.model';
import { GenericService } from 'src/app/base/services/generic.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class EditUserComponent implements OnInit {
  createUser: UntypedFormGroup;
  user: User;

  constructor(
    private genericService: GenericService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.createUser = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          RegExp(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&.,?])(?!.*[\s]).+$/
          )
        ),
      ]),
      type: new UntypedFormControl('', [Validators.required]),
    });
    if (this.data.id) {
      this.getUser();
    }
  }

  getUser() {
    this.genericService.getUsuario(this.data.id).subscribe({
      next: (user) => {
        const createUser = this.createUser;
        createUser.get('name').patchValue(user.name);
        createUser.get('email').patchValue(user.email);
        createUser.get('type').patchValue(user.type);
        createUser.get('password').patchValue(user.password);
      },
    });
  }

  sendForm() {
    this.user = { ...this.createUser.value };
    if (this.data.id) {
      if (this.createUser.get('email').valid && this.createUser.get('name').valid && this.createUser.get('type').valid) {
        if (this.user.password == this.createUser.get('password').value) delete this.user.password

        this.genericService.patchUsuario(this.data.id, this.user).subscribe({
          next: (data) => {
            this.swalService
              .success('Sucesso', 'Usuario atualizado com sucesso!', 'Ok')
              .then(() => {
                this.dialogRef.close();
              });
          },
          error: (error) => {
            this.swalService.error(
              'Error',
              error.error.message ??
                'Ocorreu um erro ao tentar atualizar o usuario!',
              'Ok'
            );
          },
        });
        return;
      }
      this.swalService.warning('Aviso', 'Preencha os campos corretamente!', 'Ok');
    } else {
      if (this.createUser.valid) {
        this.genericService.createUsuario(this.user).subscribe({
          next: (data) => {
            this.swalService
              .success('Sucesso', 'Usuario criado com sucesso!', 'Ok')
              .then(() => {
                this.dialogRef.close();
              });
          },
          error: (err) => {
            this.swalService.error(
              'Error',
              'Ocorreu um erro ao tentar criar o usuario!',
              'Ok'
            );
          },
        });
        return
      }
      this.swalService.warning('Aviso', 'Preencha os campos corretamente!', 'Ok');
    }



  }
}
