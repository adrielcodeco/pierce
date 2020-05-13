import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { User } from '#/domain/entites/user'

@Entity('users')
export class UserModel extends BaseEntity implements User {
  @PrimaryColumn()
  id!: string

  @Column()
  email!: string

  @Column()
  firstName!: string

  @Column()
  lastName?: string

  @Column()
  pwd!: string

  @OneToMany<any>(
    (type) => require('#/framework/models/itemModel').ItemModel,
    (item) => item.user
  )
  items!: import('#/framework/models/itemModel').ItemModel[]
}
