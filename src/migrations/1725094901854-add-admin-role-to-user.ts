import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminRoleToUser1725094901854 implements MigrationInterface {
    name = 'AddAdminRoleToUser1725094901854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
    }

}
