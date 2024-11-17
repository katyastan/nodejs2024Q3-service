import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Album } from '../albums/albums.entity';
import { Favorites } from 'src/favorites/favorites.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  name: string;

  @Column()
  duration: number; 

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToMany(() => Favorites, (favorites) => favorites.tracks)
  favorites: Favorites[];
}
