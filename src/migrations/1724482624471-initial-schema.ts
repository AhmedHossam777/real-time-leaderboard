import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1724482624471 implements MigrationInterface {
	name = 'InitialSchema1724482624471';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "leaderboard" DROP COLUMN "snapshotDate"`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "leaderboard" ADD "snapshotDate" TIMESTAMP NOT NULL DEFAULT now()`,
		);
	}
}