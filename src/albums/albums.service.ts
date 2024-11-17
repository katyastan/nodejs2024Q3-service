import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Album } from './albums.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Artist } from '../artists/artists.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.find({ relations: ['artist'] });
  }

  async findById(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = createAlbumDto;

    const album = this.albumsRepository.create({
        name,
        year,
    });

    if (artistId) {
      const artist = await this.artistsRepository.findOneBy({ id: artistId });
      if (!artist) throw new NotFoundException('Artist not found');
      album.artist = artist;
    }

    return await this.albumsRepository.save(album);
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');

    const { name, year, artistId } = updateAlbumDto;

    album.name = name;
    album.year = year;

    if (artistId !== undefined) {
      if (artistId === null) {
        album.artist = null;
      } else {
        const artist = await this.artistsRepository.findOneBy({ id: artistId });
        if (!artist) throw new NotFoundException('Artist not found');
        album.artist = artist;
      }
    }

    return await this.albumsRepository.save(album);
  }

  async delete(id: string): Promise<void> {
    const result = await this.albumsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }
    // TODO: Additional logic to handle artist deletion in related entities
    // - Tracks
    // - Favorites
  }
}
