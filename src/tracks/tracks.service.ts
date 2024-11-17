import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Track } from './tracks.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { Artist } from '../artists/artists.entity';
import { Album } from '../albums/albums.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find({
      relations: ['artist', 'album'],
    });
  }

  async findById(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = createTrackDto;

    const track = this.tracksRepository.create({
      name,
      duration,
    });

    if (artistId) {
      const artist = await this.artistsRepository.findOneBy({ id: artistId});
      if (!artist) throw new NotFoundException('Artist not found');
      track.artist = artist;
    }

    if (albumId) {
      const album = await this.albumsRepository.findOneBy({ id: albumId });
      if (!album) throw new NotFoundException('Album not found');
      track.album = album;
    }

    return await this.tracksRepository.save(track);
  }

  async update(id: string, updateTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');

    const { name, duration, artistId, albumId } = updateTrackDto;

    track.name = name;
    track.duration = duration;

    if (artistId !== undefined) {
      if (artistId === null) {
        track.artist = null;
      } else {
        const artist = await this.artistsRepository.findOneBy({ id: artistId });
        if (!artist) throw new NotFoundException('Artist not found');
        track.artist = artist;
      }
    }

    if (albumId !== undefined) {
      if (albumId === null) {
        track.album = null;
      } else {
        const album = await this.albumsRepository.findOneBy({ id: albumId });
        if (!album) throw new NotFoundException('Album not found');
        track.album = album;
      }
    }

    return await this.tracksRepository.save(track);
  }

  async delete(id: string): Promise<void> {
    const result = await this.tracksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }
    // TODO: Additional logic to handle artist deletion in related entities
    // - Favorites
  }
}
