import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingGame1724515433483 implements MigrationInterface {
    name = 'ChangingGame1724515433483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "description" character varying`);
    }

}
