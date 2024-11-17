import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites() {
    const artists = await this.prisma.favoriteArtist.findMany({
      select: { artist: true },
    });
    const albums = await this.prisma.favoriteAlbum.findMany({
      select: { album: true },
    });
    const tracks = await this.prisma.favoriteTrack.findMany({
      select: { track: true },
    });

    return {
      artists: artists.map((fa) => fa.artist),
      albums: albums.map((fa) => fa.album),
      tracks: tracks.map((ft) => ft.track),
    };
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) throw new NotFoundException('Artist does not exist');
    try {
      await this.prisma.favoriteArtist.create({
        data: { artistId },
      });
    } catch {
      throw new ConflictException('Artist is already in favorites');
    }
  }

  async removeArtistFromFavorites(artistId: string) {
    try {
      await this.prisma.favoriteArtist.delete({
        where: { id: artistId },
      });
    } catch {
      throw new NotFoundException('Artist not in favorites');
    }
  }

  async addAlbumToFavorites(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new NotFoundException('Album does not exist');
    try {
      await this.prisma.favoriteAlbum.create({
        data: { albumId },
      });
    } catch {
      throw new ConflictException('Album is already in favorites');
    }
  }

  async removeAlbumFromFavorites(albumId: string) {
    try {
      await this.prisma.favoriteAlbum.delete({
        where: { id: albumId },
      });
    } catch {
      throw new NotFoundException('Album not in favorites');
    }
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new NotFoundException('Track does not exist');
    try {
      await this.prisma.favoriteTrack.create({
        data: { trackId },
      });
    } catch {
      throw new ConflictException('Track is already in favorites');
    }
  }

  async removeTrackFromFavorites(trackId: string) {
    try {
      await this.prisma.favoriteTrack.delete({
        where: { id: trackId },
      });
    } catch {
      throw new NotFoundException('Track not in favorites');
    }
  }
}
