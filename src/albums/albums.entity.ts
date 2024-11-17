import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';
import { Favorites } from 'src/favorites/favorites.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToMany(() => Favorites, (favorites) => favorites.albums)
  favorites: Favorites[];

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
