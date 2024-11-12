import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map((user) => {
      const userCopy = { ...user };
      delete userCopy.password;
      return userCopy;
    });
  }

  findById(id: string): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    const userCopy = { ...user };
    delete userCopy.password;
    return userCopy;
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const newUserCopy = { ...newUser };
    delete newUserCopy.password;
    return newUserCopy;
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const updatedUserCopy = { ...user };
    delete updatedUserCopy.password;
    return updatedUserCopy;
  }

  delete(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}
