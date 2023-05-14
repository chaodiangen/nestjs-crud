import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/user/user.entity';
import { Menus } from 'src/menus/menu.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  @Expose()
  users: User[];

  @ManyToMany(() => Menus, (menus) => menus.role)
  @Expose()
  menus: Menus[];
}
