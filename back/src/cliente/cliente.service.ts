import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditRepository } from 'src/audit/audit.repository';
import { AuditService } from 'src/audit/audit.service';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
import { PropostaService } from 'src/proposta/proposta.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { ClienteRepository } from './cliente.repository';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @Inject(ClienteRepository)
    private readonly clienteRepository: ClienteRepository,
    private readonly auditService: AuditService,
    private readonly propostaService: PropostaService,
  ) {}
  async create(
    reqUser: UsuarioEntity,
    createClienteDto: CreateClienteDto,
  ): Promise<ClienteEntity> {
    let findClient = await this.clienteRepository.findByDocument(
      createClienteDto.document,
    );

    if (findClient) {
      throw new ConflictException('Já existe um cliente com esse documento!');
    }

    let createdClient = await this.clienteRepository.create(createClienteDto);

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'CREATE_CLIENTE';
    auditItem.idInTable = createdClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return createdClient;
  }

  async findAll(): Promise<ClienteEntity[]> {
    let result = await this.clienteRepository.findAll();
    if (result.length === 0) {
      throw new NotFoundException('Não existem Clientes Cadastrados!');
    }
    return result;
  }

  async findOne(id: number): Promise<ClienteEntity> {
    let findClient = await this.clienteRepository.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return findClient;
  }

  async update(
    reqUser: UsuarioEntity,
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    let findClient = await this.clienteRepository.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    await this.clienteRepository.update(id, updateClienteDto);

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'UPDATE_CLIENTE';
    auditItem.idInTable = findClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.clienteRepository.findById(id);
  }

  async remove(reqUser: UsuarioEntity, id: number): Promise<boolean> {
    let findClient = await this.clienteRepository.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'DELETE_CLIENTE';
    auditItem.idInTable = findClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.clienteRepository.delete(id);
  }

  async getPropostas(reqUser: UsuarioEntity, id: number) {
    let findClient = await this.clienteRepository.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'PROPOSTAS_CLIENTE';
    auditItem.idInTable = findClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.propostaService.getPropopostasByCliendId(id);
  }
}
