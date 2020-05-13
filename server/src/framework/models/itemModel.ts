import 'reflect-metadata'
import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { Item } from '#/domain/entites/item'

@Entity('items')
export class ItemModel extends BaseEntity implements Item {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column('json')
  groups!: string[]

  @Column()
  userId!: string

  @ManyToOne<any>(
    (type) => require('#/framework/models/userModel').UserModel,
    (user: any) => user.items
  )
  user!: import('#/framework/models/userModel').UserModel
}
