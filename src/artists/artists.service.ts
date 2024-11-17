import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from './artists.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Album } from 'src/albums/albums.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

  ) {}

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(artist);
  }

  async update(
    id: string,
    updateArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist not found');

    Object.assign(artist, updateArtistDto);

    return await this.artistsRepository.save(artist);
  }

  async delete(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }

    // TODO: Additional logic to handle artist deletion in related entities
    // - Tracks
    // - Albums
    // - Favorites
  }
}
