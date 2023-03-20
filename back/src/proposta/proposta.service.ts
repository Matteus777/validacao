import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuditService } from 'src/audit/audit.service';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { PropostaEntity } from './entities/proposta.entity';
import { PropostaRepository } from './proposta.repository';

@Injectable()
export class PropostaService {
  constructor(
    @Inject(PropostaRepository)
    private propostaRepository: PropostaRepository,
    private readonly auditService: AuditService,
  ) {}
  async create(
    reqUser: UsuarioEntity,
    createPropostaDto: CreatePropostaDto,
  ): Promise<PropostaEntity> {
    let createdProposta = await this.propostaRepository.create(
      createPropostaDto,
    );

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'proposta';
    auditItem.action = 'CREATE_PRPOSTA';
    auditItem.idInTable = createdProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return createdProposta;
  }

  async findAll(): Promise<PropostaEntity[]> {
    return await this.propostaRepository.findAll();
  }

  async findOne(id: number): Promise<PropostaEntity> {
    let findProposta = await this.propostaRepository.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta  não encontrada!');
    }
    return findProposta;
  }

  async update(
    reqUser: UsuarioEntity,
    id: number,
    updatePropostaDto: UpdatePropostaDto,
  ): Promise<PropostaEntity> {
    let findProposta = await this.propostaRepository.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta  não encontrada!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'proposta';
    auditItem.action = 'UPDATE_PROPOSTA';
    auditItem.idInTable = findProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.propostaRepository.update(
      id,
      updatePropostaDto,
    );
  }

  async remove(reqUser: UsuarioEntity, id: number): Promise<boolean> {
    let findProposta = await this.propostaRepository.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta  não encontrada!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'proposta';
    auditItem.action = 'DELETE_PROPOSTA';
    auditItem.idInTable = findProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.propostaRepository.delete(id);
  }

  async getPropopostasByCliendId(
    id: number,
  ): Promise<PropostaEntity[]> {
    let findPropostas =
      await this.propostaRepository.getPropostasByCliendId(id);
    if (findPropostas.length === 0) {
      throw new NotFoundException('Não existem propostas para este cliente!');
    }

    return findPropostas;
  }
}
