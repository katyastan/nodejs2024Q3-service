import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-123456789012',
    description: 'UUID of the user.',
  })
  id: string;

  @ApiProperty({
    example: 'your_name',
    description: 'Login name of the user.',
  })
  login: string;

  @ApiProperty({
    example: 1,
    description: 'Version number of the user record.',
  })
  version: number;

  @ApiProperty({
    example: 1655000000,
    description: 'Timestamp of user creation.',
  })
  createdAt: number;

  @ApiProperty({
    example: 1655999999,
    description: 'Timestamp of the last user update.',
  })
  updatedAt: number;
}
