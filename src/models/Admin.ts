import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import bcrypt from 'bcryptjs'
import { Rol } from "./Rol";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rol, (rol) => rol.admin)
  rol: Rol;

  @RelationId((admin: Admin) => admin.rol)
  rolId: number;

  @Column()
  Name: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  state: boolean;

  //encriptar contraseña
  hashPassword():void{
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
  }

  checkPassword(password: string){
    return bcrypt.compareSync(password, this.password)
  }
}
