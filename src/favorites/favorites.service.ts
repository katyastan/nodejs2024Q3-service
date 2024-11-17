import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FavoriteAlbum, FavoriteArtist, FavoriteTrack } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<{
    artists: FavoriteArtist[];
    albums: FavoriteAlbum[];
    tracks: FavoriteTrack[];
  }> {
    return {
      artists: await this.prisma.favoriteArtist.findMany(),
      albums: await this.prisma.favoriteAlbum.findMany(),
      tracks: await this.prisma.favoriteTrack.findMany(),
    };
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id: artistId } });
    if (!artist) throw new NotFoundException('Artist not found');
    try {
      await this.prisma.favoriteArtist.create({ data: { artistId } });
    } catch {
      throw new ConflictException('Artist is already in favorites');
    }
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    try {
      await this.prisma.favoriteArtist.delete({ where: { id: artistId } });
    } catch {
      throw new NotFoundException('Artist not in favorites');
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new NotFoundException('Album not found');
    try {
      await this.prisma.favoriteAlbum.create({ data: { albumId } });
    } catch {
      throw new ConflictException('Album is already in favorites');
    }
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    try {
      await this.prisma.favoriteAlbum.delete({ where: { id: albumId } });
    } catch {
      throw new NotFoundException('Album not in favorites');
    }
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new NotFoundException('Track not found');
    try {
      await this.prisma.favoriteTrack.create({ data: { trackId } });
    } catch {
      throw new ConflictException('Track is already in favorites');
    }
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    try {
      await this.prisma.favoriteTrack.delete({ where: { id: trackId } });
    } catch {
      throw new NotFoundException('Track not in favorites');
    }
  }
}
