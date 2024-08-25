import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingLeaderboard1724570059082 implements MigrationInterface {
    name = 'FixingLeaderboard1724570059082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP COLUMN "createdAt"`);
    }

}
