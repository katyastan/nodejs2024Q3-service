import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const now = BigInt(Date.now());
    return this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedVersion = user.version + 1;
    const now = BigInt(Date.now());

    return this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: updatedVersion,
        updatedAt: now,
      },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
