import { Module } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { PropostaController } from './proposta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaEntity } from './entities/proposta.entity';
import { PropostaRepository } from './proposta.repository';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [AuditModule, TypeOrmModule.forFeature([PropostaEntity])],
  controllers: [PropostaController],
  providers: [PropostaService, PropostaRepository],
  exports: [PropostaService, PropostaRepository],
})
export class PropostaModule {}
