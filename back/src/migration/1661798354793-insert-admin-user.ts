import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertAdminUser1661798354793 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`INSERT INTO usuario("name", "email", "password", "type") VALUES ('Administrador', 'admin@mail.com', 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc71cb6', 'Admin');`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DELETE FROM users WHERE name = 'Administrador';`,
		);
	}
}
