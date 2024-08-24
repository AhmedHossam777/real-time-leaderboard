import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGameRating1724515671999 implements MigrationInterface {
    name = 'AddGameRating1724515671999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "gameRating" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "gameRating"`);
    }

}
