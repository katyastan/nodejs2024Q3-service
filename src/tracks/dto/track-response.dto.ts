import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the track.',
  })
  id: string;

  @ApiProperty({
    example: 'Bohemian Rhapsody',
    description: 'Name of the track.',
  })
  name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the artist.',
  })
  artistId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the album.',
  })
  albumId: string;
  @ApiProperty({
    example: 354,
    description: 'Duration of the track in seconds.',
  })
  duration: number;
}
