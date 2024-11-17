import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Album } from '../albums/albums.entity';
import { Track } from '../tracks/tracks.entity';
import { Favorites } from '../favorites/favorites.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToMany(() => Favorites, (favorites) => favorites.artists)
  favorites: Favorites[];
}
