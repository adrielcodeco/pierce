import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class Item1588789387053 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'groups',
            type: 'json'
          },
          {
            name: 'userId',
            type: 'varchar'
          }
        ]
      }),
      true
    )
    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['userId']
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('users')
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    )
    if (foreignKey) {
      await queryRunner.dropForeignKey('users', foreignKey)
    }
    await queryRunner.dropTable('items')
  }
}
