import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Propostas } from 'src/app/base/models/propostas.model';
import { GenericService } from 'src/app/base/services/generic.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-edit-propostas',
  templateUrl: './edit-propostas.component.html',
  styleUrls: ['./edit-propostas.component.css'],
})
export class EditPropostasComponent implements OnInit {
  editProposta: UntypedFormGroup;
  proposta: Propostas;

  constructor(
    private genericService: GenericService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<EditPropostasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editForm();
  }

  editForm() {
    this.editProposta = new UntypedFormGroup({
      description: new UntypedFormControl('', [Validators.required]),
      status: new UntypedFormControl('', [Validators.required]),
    });
    if (this.data.id) {
      this.getProposta();
    }
  }

  getProposta() {
    this.genericService.getProposta(this.data.id).subscribe({
      next: (proposta) => {
        const editProposta = this.editProposta;
        editProposta.get('description').patchValue(proposta.description);
        editProposta.get('status').patchValue(proposta.status);
      },
    });
  }

  update() {
    if (this.editProposta.valid) {
      this.proposta = { ...this.editProposta.value };
      this.genericService.patchProposta(this.data.id, this.proposta).subscribe({
        next: (data) => {
          this.swalService
            .success('Sucesso', 'Proposta atualizada com sucesso!', 'Ok')
            .then(() => {
              this.dialogRef.close();
            });
        },
        error: (err) => {
          this.swalService.error(
            'Error',
            'Ocorreu um erro ao tentar atualizar a proposta!',
            'Ok'
          );
        },
      });
      return;
    }
    this.swalService.warning('Aviso', 'Preencha os campos corretamente!', 'Ok');
  }
}
