import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/base/models/clients.model';
import { Propostas } from 'src/app/base/models/propostas.model';
import { GenericService } from 'src/app/base/services/generic.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-create-proposta',
  templateUrl: './create-proposta.component.html',
  styleUrls: ['./create-proposta.component.css'],
})
export class CreatePropostaComponent implements OnInit {
  cadProposta: FormGroup;
  clientes: Client[];
  proposta: Propostas;

  constructor(
    private genericService: GenericService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<CreatePropostaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getClientes();
  }

  getClientes() {
    this.genericService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
    });
  }

  createForm() {
    this.cadProposta = new FormGroup({
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
    });
  }

  create() {
    if (this.cadProposta.valid) {
      this.proposta = { ...this.cadProposta.value };
      this.genericService.postProposta(this.proposta).subscribe({
        next: (data) => {
          this.swalService
            .success('Sucesso', 'Proposta cadastrada com sucesso!', 'Ok')
            .then(() => {
              this.dialogRef.close();
            });
        },
        error: (err) => {
          this.swalService.error(
            'Error',
            'Ocorreu um erro ao tentar cadastrar a proposta!',
            'Ok'
          );
        },
      });
      return;
    }
    this.swalService.warning('Aviso', 'Preencha os campos corretamente!', 'Ok');
  }
}
