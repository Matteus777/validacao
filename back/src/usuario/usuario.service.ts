/* eslint-disable @typescript-eslint/no-var-requires */
import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { AuditService } from 'src/audit/audit.service';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
import { AuthService } from 'src/auth/shared/auth.service';
import { CreateRecSenhaDto } from './dto/create-rec-senha.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUserResponseDto } from './dto/login-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { RecuperarSenhaRepository } from './recuperar-senha.repository';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
	constructor(
		@Inject(UsuarioRepository)
		private readonly usuarioRepository: UsuarioRepository,
		private readonly recSenhaRepository:RecuperarSenhaRepository,
		private readonly auditService: AuditService,
		private authService: AuthService,
	) {}

	async create(
		reqUser: UsuarioEntity,
		createUsuarioDto: CreateUsuarioDto,
	): Promise<UsuarioEntity> {
		const findUser = await this.usuarioRepository.findByEmail(
			createUsuarioDto.email,
		);
		if (findUser) {
			throw new ConflictException(
				'Este usuário já existe na base de dados!',
			);
		}

		const regex =
			/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?])(?!.*[\s]).+$/;

		if (!regex.test(createUsuarioDto.password)) {
			throw new BadRequestException(
				'Formato de senha inválido! A senha deve ter no mínimo 8 caracteres, atendendo aos critérios: ao menos 1 letra maiúscula, ao menos 1 letra minúscula, no mínimo 1 digito numérico. Caracteres em branco não são aceitos!',
			);
		}

		const hashPassword = await this.hasher(createUsuarioDto.password);
		createUsuarioDto.password = hashPassword;

		console.log(hashPassword);

		const createdUser = await this.usuarioRepository.create(
			createUsuarioDto,
		);

		const auditItem = new CreateLogDto();
		auditItem.tableName = 'USUARIO';
		auditItem.action = 'CREATE_USER';
		auditItem.idInTable = createdUser.id;
		auditItem.userId = reqUser.id;
		auditItem.userName = reqUser.name;

		await this.auditService.create(auditItem);

		return createdUser;
	}

	async login(loginUser: UsuarioEntity): Promise<LoginUserResponseDto> {
		const accessToken: string = await this.authService.login(loginUser);
		return { accessToken };
	}

	async recuperarSenha(body:CreateRecSenhaDto){
		return await this.recSenhaRepository.create(body);
	}

	async findAll(): Promise<UsuarioEntity[]> {
		return await this.usuarioRepository.findAll();
	}

	async findOne(id: number): Promise<UsuarioEntity> {
		const findUser = await this.usuarioRepository.findById(id);
		if (!findUser) {
			throw new NotFoundException('Usuário não encontrado!');
		}

		return findUser;
	}

	async update(
		reqUser: UsuarioEntity,
		id: number,
		updateUsuarioDto: UpdateUsuarioDto,
	): Promise<any> {
		const findUser = await this.usuarioRepository.findById(id);
		if (!findUser) {
			throw new NotFoundException('Usuário não encontrado!');
		}

		if (updateUsuarioDto.password) {
			const regex =
				/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?])(?!.*[\s]).+$/;

			if (!regex.test(updateUsuarioDto.password)) {
				throw new BadRequestException(
					'Formato de senha inválido! A senha deve ter no mínimo 8 caracteres, atendendo aos critérios: ao menos 1 letra maiúscula, ao menos 1 letra minúscula, no mínimo 1 digito numérico. Caracteres em branco não são aceitos!',
				);
			}
			const newPass = await this.hasher(updateUsuarioDto.password);
			updateUsuarioDto.password = newPass;
		}

		const auditItem = new CreateLogDto();
		auditItem.tableName = 'USUARIO';
		auditItem.action = 'UPDATE_USER';
		auditItem.idInTable = findUser.id;
		auditItem.userId = reqUser.id;
		auditItem.userName = reqUser.name;
		await this.auditService.create(auditItem);

		return await this.usuarioRepository.update(
			findUser.id,
			updateUsuarioDto,
		);
	}

	async findByEmail(email: string): Promise<UsuarioEntity> {
		const findUser = await this.usuarioRepository.findByEmail(email);
		if (!findUser) {
			throw new NotFoundException('Usuario não encontrado!');
		}
		return findUser;
	}

	async updatePasword(
		reqUser: UsuarioEntity,
		updatePasswordDto: UpdatePasswordDto,
	) {
		const findUser = await this.usuarioRepository.findById(reqUser.id);
		if (!findUser) {
			throw new NotFoundException('Usuário não encontrado!');
		}

		const regex =
			/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?])(?!.*[\s]).+$/;

		if (!regex.test(updatePasswordDto.password)) {
			throw new BadRequestException(
				'Formato de senha inválido! A senha deve ter no mínimo 8 caracteres, atendendo aos critérios: ao menos 1 letra maiúscula, ao menos 1 letra minúscula, no mínimo 1 digito numérico. Caracteres em branco não são aceitos!',
			);
		}

		const updatePassword = await this.hasher(updatePasswordDto.password);

		await this.usuarioRepository.updatePassword(
			reqUser.id,
			updatePassword,
		);

		const auditItem = new CreateLogDto();
		auditItem.tableName = 'USUARIO';
		auditItem.action = 'UPDATE_USER_PASSWORD';
		auditItem.idInTable = findUser.id;
		auditItem.userId = reqUser.id;
		auditItem.userName = reqUser.name;
		await this.auditService.create(auditItem);

		return await this.usuarioRepository.findById(reqUser.id);
	}

	async remove(reqUser: UsuarioEntity, id: number): Promise<boolean> {
		const findUser = await this.usuarioRepository.findById(id);
		if (!findUser) {
			throw new NotFoundException('Usuário não encontrado!');
		}

		if (findUser.clientes.length > 0) {
			throw new BadRequestException(
				'Não é possível excluir usuário responsável por clientes.',
			);
		}

		const auditItem = new CreateLogDto();
		auditItem.tableName = 'USUARIO';
		auditItem.action = 'DELETE_USER';
		auditItem.idInTable = findUser.id;
		auditItem.userId = reqUser.id;
		auditItem.userName = reqUser.name;
		await this.auditService.create(auditItem);

		return await this.usuarioRepository.delete(id);
	}

	hasher(text: string): Promise<string> {
		const crypto = require('crypto');
		const sha256Hash = crypto.createHash('sha256');
		const hashPassword = sha256Hash.update(text).digest('hex');
		return hashPassword;
	}
}
