import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1588789371598 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'firstName',
            type: 'varchar'
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'pwd',
            type: 'varchar'
          }
        ]
      }),
      true
    )
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users')
  }
}
