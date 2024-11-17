import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorites } from './favorites.entity';
import { Artist } from '../artists/artists.entity';
import { Album } from '../albums/albums.entity';
import { Track } from '../tracks/tracks.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  private async getFavorites(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findOne({
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favorites) {
      favorites = this.favoritesRepository.create();
      await this.favoritesRepository.save(favorites);
    }

    return favorites;
  }

  async getAllFavorites() {
    const favorites = await this.getFavorites();
    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id: artistId });
    if (!artist) throw new UnprocessableEntityException('Artist does not exist');

    const favorites = await this.getFavorites();

    favorites.artists.push(artist);
    await this.favoritesRepository.save(favorites);
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const favorites = await this.getFavorites();

    const index = favorites.artists.findIndex((artist) => artist.id === artistId);
    if (index === -1) throw new NotFoundException('Artist not in favorites');

    favorites.artists.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id: albumId });
    if (!album) throw new UnprocessableEntityException('Album does not exist');

    const favorites = await this.getFavorites();

    favorites.albums.push(album);
    await this.favoritesRepository.save(favorites);
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const favorites = await this.getFavorites();

    const index = favorites.albums.findIndex((album) => album.id === albumId);
    if (index === -1) throw new NotFoundException('Album not in favorites');

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) throw new UnprocessableEntityException('Track does not exist');

    const favorites = await this.getFavorites();

    favorites.tracks.push(track);
    await this.favoritesRepository.save(favorites);
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const favorites = await this.getFavorites();

    const index = favorites.tracks.findIndex((track) => track.id === trackId);
    if (index === -1) throw new NotFoundException('Track not in favorites');

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }
}
