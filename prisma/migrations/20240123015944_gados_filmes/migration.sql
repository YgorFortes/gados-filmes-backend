-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "imdb_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "rated" VARCHAR(255) NOT NULL,
    "released" TIMESTAMP(3) NOT NULL,
    "runtime" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "director" VARCHAR(255) NOT NULL,
    "writer" VARCHAR(255) NOT NULL,
    "actors" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "awards" VARCHAR(255) NOT NULL,
    "poster" VARCHAR(255) NOT NULL,
    "ratings" VARCHAR(255) NOT NULL,
    "metascore" VARCHAR(255) NOT NULL,
    "imdb_rating" VARCHAR(255) NOT NULL,
    "imdb_votes" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "dvd" VARCHAR(255) NOT NULL,
    "box_office" VARCHAR(255) NOT NULL,
    "production" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdb_id_key" ON "Movie"("imdb_id");
