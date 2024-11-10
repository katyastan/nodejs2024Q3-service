import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './tracks.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService
  ) {}

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: CreateTrackDto): Track {
    const track = this.findById(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  delete(id: string): void {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Track not found');

    this.favoritesService.removeTrackFromFavorites(id);
    this.tracks.splice(index, 1);
  }

  removeArtistFromTracks(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
