import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the album.',
  })
  id: string;

  @ApiProperty({
    example: 'Freddie Mercury',
    description: 'Name of the album.',
  })
  name: string;

  @ApiProperty({
    example: 1991,
    description: 'Indicates the year the album was released.',
  })
  year: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the artist.',
  })
  artistId: string;
}
