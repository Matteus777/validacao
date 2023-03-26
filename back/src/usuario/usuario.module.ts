import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { AuditModule } from 'src/audit/audit.module';
import { AuthModule } from 'src/auth/auth.module';
import { RecuperarSenhaEntity } from './entities/recupera_senha.entity';
import { RecuperarSenhaRepository } from './recuperar-senha.repository';

@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forFeature([UsuarioEntity,RecuperarSenhaEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository,RecuperarSenhaRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
