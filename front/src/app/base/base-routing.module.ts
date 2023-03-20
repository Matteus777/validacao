import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GUARDS, PermissionsGuard } from '../core/guards/permissions.guard';
import { BaseComponent } from './base.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PropostasComponent } from './pages/propostas/propostas.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [PermissionsGuard],
        data: { guards: [GUARDS.ADMIN] },
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [PermissionsGuard],
        data: { guards: [GUARDS.ADMIN, GUARDS.ASSISTENTE] },
      },
      {
        path: 'propostas',
        component: PropostasComponent,
        canActivate: [PermissionsGuard],
        data: { guards: [GUARDS.ADMIN] },
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent,
        canActivate: [PermissionsGuard],
        data: { guards: [GUARDS.ADMIN] },
      },
    ],
    canActivate: [PermissionsGuard],
    data: { guards: [GUARDS.ADMIN, GUARDS.ASSISTENTE] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
