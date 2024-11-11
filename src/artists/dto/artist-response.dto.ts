import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the artist.',
  })
  id: string;

  @ApiProperty({
    example: 'Freddie Mercury',
    description: 'Name of the artist.',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the artist has won a Grammy.',
  })
  grammy: boolean;
}
