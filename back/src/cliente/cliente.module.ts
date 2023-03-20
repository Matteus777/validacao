import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { ClienteRepository } from './cliente.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuditModule } from 'src/audit/audit.module';
import { PropostaModule } from 'src/proposta/proposta.module';

@Module({
  imports: [
    PropostaModule,
    AuditModule,
    UsuarioModule,
    TypeOrmModule.forFeature([ClienteEntity]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteRepository],
  exports: [ClienteService],
})
export class ClienteModule {}
