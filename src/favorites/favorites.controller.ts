import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'List of favorites.',
    type: [FavoritesResponseDto],
  })
  getAll() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 201,
    description: 'Artist added to favorites.',
    type: FavoritesResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Artist not found.' })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist  is not favorite.' })
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({
    status: 201,
    description: 'Album added to favorites.',
    type: FavoritesResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Album not found.' })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 204, description: 'Album deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album is not favorite.' })
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 201,
    description: 'Track added to favorites.',
    type: FavoritesResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Track not found.' })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 204, description: 'Track deleted from favorites.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track is not favorite.' })
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.removeTrackFromFavorites(id);
  }
}
