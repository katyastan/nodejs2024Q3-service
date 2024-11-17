import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany({
      select: {
        id: true,
        name: true,
        year: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        year: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
      },
    });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
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
      select: {
        id: true,
        name: true,
        year: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
      },
    });
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
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
      select: {
        id: true,
        name: true,
        year: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    try {
      await this.prisma.album.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }
}
