import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoritesEntity1748652419144 implements MigrationInterface {
  name = 'AddFavoritesEntity1748652419144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" integer NOT NULL, "jsonStr" character varying NOT NULL, "version" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
