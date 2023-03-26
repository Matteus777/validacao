import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecSenhaDto } from './dto/create-rec-senha.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RecuperarSenhaEntity } from './entities/recupera_senha.entity';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class RecuperarSenhaRepository {
	constructor(
		@InjectRepository(RecuperarSenhaEntity)
		private recuperarSenhaRepository: Repository<RecuperarSenhaEntity>,
	) {}

	async create(createUsuarioDto: CreateRecSenhaDto): Promise<RecuperarSenhaEntity> {
		return await this.recuperarSenhaRepository.save(createUsuarioDto);
	}

	
}
