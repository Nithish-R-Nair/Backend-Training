import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoiningDateExperienceStatusToEmployee1747989471606 implements MigrationInterface {
    name = 'AddJoiningDateExperienceStatusToEmployee1747989471606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
    }

}
