import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioRepository {
	constructor(
		@InjectRepository(UsuarioEntity)
		private usuarioRepository: Repository<UsuarioEntity>,
	) {}

	async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
		return await this.usuarioRepository.save(createUsuarioDto);
	}

	async findById(id: number): Promise<UsuarioEntity> {
		return await this.usuarioRepository.findOne({ where: { id: id } });
	}

	async findAll(): Promise<UsuarioEntity[]> {
		return await this.usuarioRepository.find();
	}

	async findByEmail(email: string): Promise<UsuarioEntity> {
		return await this.usuarioRepository.findOne({
			where: { email: email },
		});
	}

	async update(
		id: number,
		updateUsuarioDto: UpdateUsuarioDto,
	): Promise<UsuarioEntity> {
		let updateUser = new UsuarioEntity();
		updateUser = Object.assign(updateUser, updateUsuarioDto);

		await this.usuarioRepository.update(id, updateUser);

		return await this.findById(id);
	}

	async updatePassword(id: number, updatePassword: string): Promise<any> {
		return await this.usuarioRepository.update(id, {
			password: updatePassword,
		});
	}

	async delete(id: number): Promise<boolean> {
		await this.usuarioRepository.delete(id);
		return true;
	}
}
