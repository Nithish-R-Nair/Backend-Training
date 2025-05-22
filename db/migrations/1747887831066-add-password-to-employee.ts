import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToEmployee1747887831066 implements MigrationInterface {
    name = 'AddPasswordToEmployee1747887831066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "password" = 'password' WHERE "password" is NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }
}
