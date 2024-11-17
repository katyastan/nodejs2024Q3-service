import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found.');
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async update(id: string, updateArtistDto: CreateArtistDto): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch {
      throw new NotFoundException('Artist not found');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Artist not found');
    }
    await this.prisma.favoriteArtist.deleteMany({ where: { artistId: id } });
    await this.prisma.album.deleteMany({ where: { artistId: id } });
    await this.prisma.track.deleteMany({ where: { artistId: id } });
  }
}
