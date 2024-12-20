import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFeat1734720801242 implements MigrationInterface {
    name = 'AddNewFeat1734720801242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "read" boolean NOT NULL DEFAULT false, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "maxParticipants" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friends" ("userId" integer NOT NULL, "friendId" integer NOT NULL, CONSTRAINT "PK_4662598c8e7a97df59705e1b576" PRIMARY KEY ("userId", "friendId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a04bbd8154eb20c5138a38bb5a" ON "user_friends" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f51239b2835ec1196de5f885ab" ON "user_friends" ("friendId") `);
        await queryRunner.query(`CREATE TABLE "tournament_participants_user" ("tournamentId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9f433ec57343bab92404de31bff" PRIMARY KEY ("tournamentId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5ef7a740c0e8144cd4bebb507" ON "tournament_participants_user" ("tournamentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_90d00cac98bdcb6e1af5dc3608" ON "tournament_participants_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "tournament_games_game" ("tournamentId" integer NOT NULL, "gameId" integer NOT NULL, CONSTRAINT "PK_930ce9c8666e375885417ad67bc" PRIMARY KEY ("tournamentId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8b1c27e1d776eb323132274e2" ON "tournament_games_game" ("tournamentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac0e28e87265df22093fa47a65" ON "tournament_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_71fb36906595c602056d936fc13" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_a04bbd8154eb20c5138a38bb5aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_f51239b2835ec1196de5f885ab2" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_user" ADD CONSTRAINT "FK_b5ef7a740c0e8144cd4bebb507c" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_user" ADD CONSTRAINT "FK_90d00cac98bdcb6e1af5dc36088" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_games_game" ADD CONSTRAINT "FK_a8b1c27e1d776eb323132274e2f" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tournament_games_game" ADD CONSTRAINT "FK_ac0e28e87265df22093fa47a653" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament_games_game" DROP CONSTRAINT "FK_ac0e28e87265df22093fa47a653"`);
        await queryRunner.query(`ALTER TABLE "tournament_games_game" DROP CONSTRAINT "FK_a8b1c27e1d776eb323132274e2f"`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_user" DROP CONSTRAINT "FK_90d00cac98bdcb6e1af5dc36088"`);
        await queryRunner.query(`ALTER TABLE "tournament_participants_user" DROP CONSTRAINT "FK_b5ef7a740c0e8144cd4bebb507c"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_f51239b2835ec1196de5f885ab2"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_a04bbd8154eb20c5138a38bb5aa"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_71fb36906595c602056d936fc13"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac0e28e87265df22093fa47a65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8b1c27e1d776eb323132274e2"`);
        await queryRunner.query(`DROP TABLE "tournament_games_game"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90d00cac98bdcb6e1af5dc3608"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5ef7a740c0e8144cd4bebb507"`);
        await queryRunner.query(`DROP TABLE "tournament_participants_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f51239b2835ec1196de5f885ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a04bbd8154eb20c5138a38bb5a"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
        await queryRunner.query(`DROP TABLE "tournament"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
    }

}
