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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TrackResponseDto } from './dto/track-response.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'List of tracks.',
    type: [TrackResponseDto],
  })
  async getAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 200,
    description: 'Track found.',
    type: TrackResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully.',
    type: TrackResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track info' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 200,
    description: 'Track updated successfully.',
    type: TrackResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.tracksService.delete(id);
  }
}
