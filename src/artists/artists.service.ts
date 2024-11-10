import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Artist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: CreateArtistDto): Artist {
    const artist = this.findById(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  delete(id: string): void {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');

    this.albumsService.removeArtistFromAlbums(id);
    this.tracksService.removeArtistFromTracks(id);
    this.favoritesService.removeArtist(id);
    this.artists.splice(index, 1);
  }
}
