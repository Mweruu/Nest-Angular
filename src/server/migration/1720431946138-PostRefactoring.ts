import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1720431946138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" RENAME TO "firstName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "firstName" RENAME TO "name"`,
    );
  }
}
