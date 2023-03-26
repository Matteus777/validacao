import { IsNumber, IsEmail, IsString, MinLength, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { UsuarioEnum } from "../enum/usuario.enum";

export class CreateRecSenhaDto {
	@IsNumber()
	@IsOptional()
	lat?: number;

	@IsNumber()
	@IsOptional()
	long?: number;

	@IsString()
  @IsEmail()
	@IsOptional()
	user?: string;

	@IsString()
	@IsOptional()
	image?: string;
}