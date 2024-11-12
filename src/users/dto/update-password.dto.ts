import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'OldPassword123',
    description: 'Current password of the user.',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'NewPassword123',
    description: 'New password for the user.',
  })
  @IsString()
  newPassword: string;
}
