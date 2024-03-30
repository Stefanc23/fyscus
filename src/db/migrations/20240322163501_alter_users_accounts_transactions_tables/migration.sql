-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('IDR', 'USD');

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "exchange_rate_used" DECIMAL(65,30),
ADD COLUMN     "stored_currency" "Currency" NOT NULL DEFAULT 'IDR',
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "default_currency" "Currency" NOT NULL DEFAULT 'IDR';
