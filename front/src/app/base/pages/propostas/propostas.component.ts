import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Propostas } from '../../models/propostas.model';
import { GenericService } from '../../services/generic.service';
import { CreatePropostaComponent } from './edit/create-proposta/create-proposta.component';
import { EditPropostasComponent } from './edit/edit-propostas/edit-propostas.component';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
})
export class PropostasComponent implements OnInit {
  propostas: Propostas[];
  perm = localStorage.getItem('perm');

  constructor(
    private genericService: GenericService,
    public dialog: MatDialog,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.getPropostas();
  }

  getPropostas() {
    this.genericService.getPropostas().subscribe({
      next: (data) => {
        this.propostas = data;
      },
    });
  }

  create() {
    const dialogRef = this.dialog.open(CreatePropostaComponent, {
      width: '35%',
      height: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getPropostas();
    });
  }

  delete(id: number) {
    this.swalService
      .warning('Aviso', 'Deseja excluir a proposta?', 'Confirmar')
      .then((result) => {
        if (result.isConfirmed) {
          this.genericService.deleteProposta(id).subscribe({
            next: () => {
              this.swalService.success('Sucesso', 'Proposta excluida', 'Ok');
              this.getPropostas();
            },
            error: () => {
              this.swalService.error(
                'Error',
                'Ocorreu um erro ao tentar excluir a proposta',
                'Ok'
              );
            },
          });
        }
      });
  }

  update(id: number): void {
    const dialogRef = this.dialog.open(EditPropostasComponent, {
      width: '35%',
      height: '35%',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getPropostas();
    });
  }
}
