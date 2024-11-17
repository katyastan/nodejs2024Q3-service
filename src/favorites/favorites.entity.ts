import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Album } from '../albums/albums.entity';
import { Track } from '../tracks/tracks.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @ManyToMany(() => Artist, {
    cascade: true,
  })
  @JoinTable({
    name: 'favorite_artists',
    joinColumn: {
      name: 'favoritesId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];

  @ManyToMany(() => Album, {
    cascade: true,
  })
  @JoinTable({
    name: 'favorite_albums',
    joinColumn: {
      name: 'favoritesId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
    },
  })
  albums: Album[];

  @ManyToMany(() => Track, {
    cascade: true,
  })
  @JoinTable({
    name: 'favorite_tracks',
    joinColumn: {
      name: 'favoritesId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trackId',
      referencedColumnName: 'id',
    },
  })
  tracks: Track[];
}
