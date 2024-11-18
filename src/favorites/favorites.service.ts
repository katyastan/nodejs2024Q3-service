import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    return {
      artists: await this.prisma.favoriteArtist.findMany().then((favorites) => {
        return this.prisma.artist.findMany({
          where: { id: { in: favorites.map((fav) => fav.artistId) } },
        });
      }),
      albums: await this.prisma.favoriteAlbum.findMany().then((favorites) => {
        return this.prisma.album.findMany({
          where: { id: { in: favorites.map((fav) => fav.albumId) } },
        });
      }),
      tracks: await this.prisma.favoriteTrack.findMany().then((favorites) => {
        return this.prisma.track.findMany({
          where: { id: { in: favorites.map((fav) => fav.trackId) } },
        });
      }),
    };
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    await this.assertArtistExists(artistId);
    try {
      await this.prisma.favoriteArtist.create({ data: { artistId } });
    } catch {
      throw new ConflictException('Artist is already in favorites');
    }
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    try {
      await this.prisma.favoriteArtist.delete({ where: { artistId } });
    } catch {
      throw new NotFoundException('Artist not in favorites');
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    await this.assertAlbumExists(albumId);
    try {
      await this.prisma.favoriteAlbum.create({ data: { albumId } });
    } catch {
      throw new ConflictException('Album is already in favorites');
    }
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    try {
      await this.prisma.favoriteAlbum.delete({ where: { albumId } });
    } catch {
      throw new NotFoundException('Album not in favorites');
    }
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    await this.assertTrackExists(trackId);
    try {
      await this.prisma.favoriteTrack.create({ data: { trackId } });
    } catch {
      throw new ConflictException('Track is already in favorites');
    }
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    try {
      await this.prisma.favoriteTrack.delete({ where: { trackId } });
    } catch {
      throw new NotFoundException('Track not in favorites');
    }
  }

  private async assertArtistExists(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist)
      throw new UnprocessableEntityException('Artist does not exist');
  }

  private async assertAlbumExists(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new UnprocessableEntityException('Album does not exist');
  }

  private async assertTrackExists(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new UnprocessableEntityException('Track does not exist');
  }
}
