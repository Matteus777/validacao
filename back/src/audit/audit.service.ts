import { Inject, Injectable } from '@nestjs/common';
import { AuditRepository } from './audit.repository';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AuditRepository)
    private auditRepository: AuditRepository,
  ) {}

  async create(createLogtDto: CreateLogDto) {
    await this.auditRepository.createLog(createLogtDto);
  }
}
