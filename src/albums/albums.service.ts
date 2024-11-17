import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({
      data: {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artist: {
          connect: createAlbumDto.artistId
            ? { id: createAlbumDto.artistId }
            : undefined,
        },
      },
    });
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');

    return this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artist: {
          connect: updateAlbumDto.artistId
            ? { id: updateAlbumDto.artistId }
            : undefined,
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Album not found');
    }
    await this.prisma.favoriteAlbum.deleteMany({ where: { albumId: id } });
    await this.prisma.track.deleteMany({ where: { albumId: id } });
  }
}
