-- DropForeignKey
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteArtist" DROP CONSTRAINT "FavoriteArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteTrack" DROP CONSTRAINT "FavoriteTrack_trackId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
