import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepository } from './audit.repository';
import { AuditService } from './audit.service';
import { AuditEntity } from './entities/audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService, AuditRepository],
  exports: [AuditService, AuditRepository],
})
export class AuditModule {}
