-- CreateTable
CREATE TABLE "Movies_users" (
    "id" SERIAL NOT NULL,
    "idusuarios" INTEGER NOT NULL,
    "idfilmes" INTEGER NOT NULL,
    "classificacao" INTEGER NOT NULL,

    CONSTRAINT "Movies_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movies_users" ADD CONSTRAINT "Movies_users_idusuarios_fkey" FOREIGN KEY ("idusuarios") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies_users" ADD CONSTRAINT "Movies_users_idfilmes_fkey" FOREIGN KEY ("idfilmes") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
