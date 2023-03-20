import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SwalService } from 'src/app/shared/services/swal.service';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css'],
})
export class TrocarSenhaComponent implements OnInit {
  formSenha: FormGroup;

  constructor(
    public swalService: SwalService,
    public service: GenericService,
    public dialogRef: MatDialogRef<TrocarSenhaComponent>
  ) {}

  ngOnInit(): void {
    this.formSenha = new FormGroup({
      novaSenha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          RegExp(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&.,?])(?!.*[\s]).+$/
          )
        ),
      ]),
    });
  }

  save() {
    if (this.formSenha.invalid) {
      this.swalService.error(
        'Erro',
        'Formato de senha inválido! A senha deve ter no mínimo 8 caracteres, atendendo aos critérios: ao menos 1 letra maiúscula, ao menos 1 letra minúscula, no mínimo 1 digito numérico. Caracteres em branco não são aceitos!',
        'Ok'
      );
    }
    this.service.trocaSenha(this.formSenha.value.novaSenha).subscribe({
      next: (data) => {
        this.swalService.success(
          'Concluído',
          'Senha atualizada com sucesso.',
          'Ok'
        );
        this.dialogRef.close();
      },
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
