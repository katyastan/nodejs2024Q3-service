import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'List of artists.' })
  getAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({ status: 200, description: 'Artist found.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({ status: 201, description: 'Artist created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist info' })
  @ApiResponse({ status: 200, description: 'Artist updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.artistsService.delete(id);
  }
}
