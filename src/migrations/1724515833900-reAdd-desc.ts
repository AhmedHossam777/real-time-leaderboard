import { MigrationInterface, QueryRunner } from "typeorm";

export class ReAddDesc1724515833900 implements MigrationInterface {
    name = 'ReAddDesc1724515833900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "description"`);
    }

}
