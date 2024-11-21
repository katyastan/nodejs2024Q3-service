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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { LoggingService } from '../logging/logging.service';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'List of artists.',
    type: [ArtistResponseDto],
  })
  async getAll() {
    this.loggingService.log('Getting all artists', 'Artists');
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 200,
    description: 'Artist found.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggingService.log(`Getting artist by id: ${id}`, 'Artists');
    return await this.artistsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({
    status: 201,
    description: 'Artist created successfully.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    this.loggingService.log(
      `Creating artist: ${createArtistDto.name}`,
      'Artists',
    );
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist info' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 200,
    description: 'Artist updated successfully.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    this.loggingService.log(`Updating artist: ${id}`, 'Artists');
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.loggingService.log(`Removing artist: ${id}`, 'Artists');
    await this.artistsService.delete(id);
  }
}
