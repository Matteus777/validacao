import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EditClientesComponent } from './pages/clientes/edit/edit-clientes/edit-clientes.component';
import { CreatePropostaComponent } from './pages/propostas/edit/create-proposta/create-proposta.component';
import { EditPropostasComponent } from './pages/propostas/edit/edit-propostas/edit-propostas.component';
import { PropostasComponent } from './pages/propostas/propostas.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { TrocarSenhaComponent } from './pages/trocar-senha/trocar-senha.component';
import { EditUserComponent } from './pages/usuarios/edit/edit-user/create-user.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    BaseComponent,
    ClientesComponent,
    PropostasComponent,
    RelatoriosComponent,
    EditClientesComponent,
    EditPropostasComponent,
    CreatePropostaComponent,
    UsuariosComponent,
    EditUserComponent,
    TrocarSenhaComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [BaseComponent],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class BaseModule {}
