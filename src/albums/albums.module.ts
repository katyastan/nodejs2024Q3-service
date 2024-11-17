import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    forwardRef(() => TracksModule), 
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
