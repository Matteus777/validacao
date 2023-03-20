import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { PropostaEntity } from './entities/proposta.entity';

@Injectable()
export class PropostaRepository {
	constructor(
		@InjectRepository(PropostaEntity)
		private propostaRepository: Repository<PropostaEntity>,
	) {}

	async create(
		createPropostaDto: CreatePropostaDto,
	): Promise<PropostaEntity> {
		return await this.propostaRepository.save(
			createPropostaDto,
		);
	}

	async findOneById(id: number): Promise<PropostaEntity> {
		return await this.propostaRepository.findOne({
			relations: ['cliente'],
			where: { id: id },
		});
	}

	async findAll(): Promise<PropostaEntity[]> {
		return await this.propostaRepository.find({
			relations: ['cliente'],
		});
	}

	async update(
		id: number,
		updatePropostaDto: UpdatePropostaDto,
	): Promise<PropostaEntity> {
		let updateProposta = new PropostaEntity();
		updateProposta = Object.assign(
			updateProposta,
			updatePropostaDto,
		);

		await this.propostaRepository.update(id, updateProposta);

		return await this.findOneById(id);
	}

	async delete(id: number): Promise<boolean> {
		await this.propostaRepository.delete(id);
		return true;
	}

	async getPropostasByCliendId(
		id: number,
	): Promise<PropostaEntity[]> {
		return await this.propostaRepository.find({
			relations: ['cliente'],
			where: { cliente: id },
		});
	}
}
