/*
  Warnings:

  - You are about to drop the column `idfilmes` on the `Movies_users` table. All the data in the column will be lost.
  - You are about to drop the column `idusuarios` on the `Movies_users` table. All the data in the column will be lost.
  - Added the required column `id_filme` to the `Movies_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Movies_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movies_users" DROP CONSTRAINT "Movies_users_idfilmes_fkey";

-- DropForeignKey
ALTER TABLE "Movies_users" DROP CONSTRAINT "Movies_users_idusuarios_fkey";

-- AlterTable
ALTER TABLE "Movies_users" DROP COLUMN "idfilmes",
DROP COLUMN "idusuarios",
ADD COLUMN     "id_filme" INTEGER NOT NULL,
ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Movies_users" ADD CONSTRAINT "Movies_users_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies_users" ADD CONSTRAINT "Movies_users_id_filme_fkey" FOREIGN KEY ("id_filme") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
