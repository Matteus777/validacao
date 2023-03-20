import { IsString } from 'class-validator';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';

export class CreatePropostaDto {
  @IsString()
  description: string;

  @IsString()
  status: string = 'open';

  cliente?: ClienteEntity;
}
