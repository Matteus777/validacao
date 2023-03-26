import { ClienteEntity } from "src/cliente/entities/cliente.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UsuarioEnum } from "../enum/usuario.enum";

@Entity({ name: 'recuperar_senha' })
export class RecuperarSenhaEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  user: string;

  @Column({type:'float',nullable:true})
  lat: number;

  @Column({type:'float',nullable:true})
  long: number;

  @Column({type:'text',nullable:true})
  image:string


}
