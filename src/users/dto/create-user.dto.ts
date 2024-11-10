import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'your_name',
    description: 'Unique login name for the user.',
  })
  @IsString()
  @MinLength(1, { message: 'Login is required' })
  login: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password for the user account.',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
