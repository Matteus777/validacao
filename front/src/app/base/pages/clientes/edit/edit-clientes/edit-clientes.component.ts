import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/base/models/clients.model';
import { GenericService } from 'src/app/base/services/generic.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.css'],
})
export class EditClientesComponent implements OnInit {
  formCliente: FormGroup;
  users: any = [];
  internalResponsible: any;
  constructor(
    public swal: SwalService,
    public dialogRef: MatDialogRef<EditClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client = new Client(),
    private genericService: GenericService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.loadUsers();
    }, 60000)
    this.loadUsers();
    this.formCliente = new FormGroup({
      name: new FormControl('', [Validators.required]),
      document: new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(11),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      responsiblePerson: new FormControl('', [Validators.required]),
      internalResponsible: new FormControl(0),
    });
    if (this.data) {
      console.log(this.data.internalResponsible);
      this.formCliente.get('name').setValue(this.data.name);
      this.formCliente.get('document').setValue(this.data.document);
      this.formCliente.get('phone').setValue(this.data.phone);
      this.formCliente.get('email').setValue(this.data.email);
      this.formCliente
        .get('responsiblePerson')
        .setValue(this.data.responsiblePerson);
      this.internalResponsible = this.data.internalResponsible.id;
    }
  }

  loadUsers() {
    this.genericService.getUsuarios().subscribe({
      next: (data) => {
        localStorage.setItem('users', JSON.stringify(data));
        this.users = data;
      },
      error: () => {
        this.users = JSON.parse(localStorage.getItem('users'));
      },
    });
  }

  save() {
    if (!this.formCliente.valid) {
      this.swal.error('Erro', 'Preencha todos os campos.', 'Ok');
      return;
    }
    let user = this.formCliente.value;
    user.internalResponsible = this.internalResponsible;
    if (this.data) {
      user.id = this.data.id;
      this.genericService.patchClient(user.id, user).subscribe({
        next: (data) => {
          this.swal.success(
            'Concluído',
            'Cliente atualizado com sucesso.',
            'Ok'
          );
          this.dialogRef.close();
        },
        error: (err) => {
          this.swal.error('Erro', err.error.message, 'Ok');
        },
      });
    } else {
      this.genericService.insertClient(user).subscribe({
        next: (data) => {
          this.swal.success(
            'Concluído',
            'Cliente cadastrado com sucesso.',
            'Ok'
          );
          this.dialogRef.close();
        },
        error: (err) => {
          this.swal.error('Erro', err.error.message, 'Ok');
        },
      });
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
