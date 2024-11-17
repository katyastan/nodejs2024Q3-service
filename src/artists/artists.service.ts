import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new NotFoundException('Artist not found.');
    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async update(id: string, updateArtistDto: CreateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch {
      throw new NotFoundException('Artist not found.');
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.artist.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Artist not found.');
    }
  }
}
