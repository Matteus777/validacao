import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { TokeInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [CoreComponent],
  imports: [HttpClientModule, CommonModule, CoreRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
