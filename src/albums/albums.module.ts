import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './albums.entity';
import { Artist } from 'src/artists/artists.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { Track } from 'src/tracks/tracks.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule), 
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Album, Artist, Track]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
