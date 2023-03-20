import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/services/auth.service';
import { TrocarSenhaComponent } from './pages/trocar-senha/trocar-senha.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  perm = localStorage.getItem('perm');

  ngOnInit(): void {}

  logout() {
    this.authService.logout('login');
  }

  trocaSenha() {
    this.dialog.open(TrocarSenhaComponent);
  }
}
