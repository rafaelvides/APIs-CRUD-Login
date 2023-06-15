import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./Admin";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Admin, (admin) => admin.id)
  admin: Admin;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column({ default: true })
  state: boolean;
}
