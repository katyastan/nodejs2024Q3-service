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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dto = plainToInstance(UpdatePasswordDto, updatePasswordDto);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.usersService.delete(id);
  }
}
