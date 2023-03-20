import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwalService } from 'src/app/shared/services/swal.service';
import { User } from '../../models/usuario.model';
import { GenericService } from '../../services/generic.service';
import { EditUserComponent } from './edit/edit-user/create-user.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];

  constructor(
    private genericService: GenericService,
    public dialog: MatDialog,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.genericService.getUsuarios().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  create() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '35%',
      height: '45%',
      data: { id: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsers();
    });
  }

  delete(id: number) {
    this.swalService
      .warning('Aviso', 'Deseja excluir usuário?', 'Confirmar')
      .then((result) => {
        if (result.isConfirmed) {
          this.genericService.deleteUsuario(id).subscribe({
            next: () => {
              this.swalService.success('Sucesso', 'Usuario excluido', 'Ok');
              this.getUsers();
            },
            error: (data) => {
              this.swalService.error('Error', data.error.message, 'Ok');
            },
          });
        }
      });
  }

  update(id: number) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '35%',
      height: '45%',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsers();
    });
  }
}
