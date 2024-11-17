import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';


@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.track.findMany({
      select: {
        id: true,
        name: true,
        duration: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        album: {
          select: {
            id: true,
            name: true,
            year: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        duration: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        album: {
          select: {
            id: true,
            name: true,
            year: true,
          },
        },
      },
    });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({
      data: {
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        artist: {
          connect: createTrackDto.artistId
            ? { id: createTrackDto.artistId }
            : undefined,
        },
        album: {
          connect: createTrackDto.albumId
            ? { id: createTrackDto.albumId }
            : undefined,
        },
      },
      select: {
        id: true,
        name: true,
        duration: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        album: {
          select: {
            id: true,
            name: true,
            year: true,
          },
        },
      },
    });
  }

  async update(id: string, updateTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) throw new NotFoundException('Track not found');

    return this.prisma.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
        artist: {
          connect: updateTrackDto.artistId
            ? { id: updateTrackDto.artistId }
            : undefined,
        },
        album: {
          connect: updateTrackDto.albumId
            ? { id: updateTrackDto.albumId }
            : undefined,
        },
      },
      select: {
        id: true,
        name: true,
        duration: true,
        artist: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        album: {
          select: {
            id: true,
            name: true,
            year: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }
}
