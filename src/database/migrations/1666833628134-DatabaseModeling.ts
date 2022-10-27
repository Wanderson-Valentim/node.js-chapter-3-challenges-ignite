import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseModeling1666833628134 implements MigrationInterface {
    name = 'DatabaseModeling1666833628134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_games_games" ("ordersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_1b47aa6827c59190689ebdfcd48" PRIMARY KEY ("ordersId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_636a095c03f77ba74310f2037b" ON "orders_games_games" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b95ce1123f0bb09aa2d759145" ON "orders_games_games" ("gamesId") `);
        await queryRunner.query(`CREATE TABLE "games_genres_genres" ("gamesId" uuid NOT NULL, "genresId" uuid NOT NULL, CONSTRAINT "PK_688976916276a7700eda129b9c0" PRIMARY KEY ("gamesId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3ac65ea9002de25d3d841d2b6" ON "games_genres_genres" ("gamesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d59ed8cbec8cc23ca2c251545" ON "games_genres_genres" ("genresId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_3b69e6cef8beb5c18429ceebe27" UNIQUE ("ordersId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_636a095c03f77ba74310f2037bc" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_1b95ce1123f0bb09aa2d7591457" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_d3ac65ea9002de25d3d841d2b62" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_5d59ed8cbec8cc23ca2c2515455" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_5d59ed8cbec8cc23ca2c2515455"`);
        await queryRunner.query(`ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_d3ac65ea9002de25d3d841d2b62"`);
        await queryRunner.query(`ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_1b95ce1123f0bb09aa2d7591457"`);
        await queryRunner.query(`ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_636a095c03f77ba74310f2037bc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersId"`);
        await queryRunner.query(`DROP INDEX "IDX_5d59ed8cbec8cc23ca2c251545"`);
        await queryRunner.query(`DROP INDEX "IDX_d3ac65ea9002de25d3d841d2b6"`);
        await queryRunner.query(`DROP TABLE "games_genres_genres"`);
        await queryRunner.query(`DROP INDEX "IDX_1b95ce1123f0bb09aa2d759145"`);
        await queryRunner.query(`DROP INDEX "IDX_636a095c03f77ba74310f2037b"`);
        await queryRunner.query(`DROP TABLE "orders_games_games"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
