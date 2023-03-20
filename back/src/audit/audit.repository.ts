import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { AuditEntity } from './entities/audit.entity';

@Injectable()
export class AuditRepository {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,
  ) {}

  async createLog(createLogDto: CreateLogDto) {
    await this.auditRepository.save(createLogDto);
  }
}
