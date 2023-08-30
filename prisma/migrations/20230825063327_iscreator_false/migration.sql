-- AlterTable
ALTER TABLE "reilter" ALTER COLUMN "iscreator" DROP NOT NULL,
ALTER COLUMN "iscreator" SET DEFAULT false,
ALTER COLUMN "isactive" DROP NOT NULL,
ALTER COLUMN "isactive" SET DEFAULT false;
