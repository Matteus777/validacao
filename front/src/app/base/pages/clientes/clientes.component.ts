import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Client } from '../../models/clients.model';
import { GenericService } from '../../services/generic.service';
import { EditClientesComponent } from './edit/edit-clientes/edit-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: any = [];
  constructor(
    public swal: SwalService,
    private genericService: GenericService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(EditClientesComponent, { data: data });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadClientes();
    });
  }
  
  loadClientes() {
    this.genericService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      }
    });
  }

  delete(id: number) {
    this.swal
      .warning('Aviso', 'Deseja excluir o Cliente?', 'Confirmar')
      .then((result) => {
        if (result.isConfirmed) {
          this.genericService.deleteClient(id).subscribe({
            next: () => {
              this.swal.success('Sucesso', 'Cliente excluido', 'Ok');
              this.loadClientes();
            },
            error: () => {
              this.swal.error(
                'Error',
                'Ocorreu um erro ao tentar excluir o cliente',
                'Ok'
              );
            },
          });
        }
      });
  }

  edit(client: Client) {
    this.openDialog(client);
  }
}
