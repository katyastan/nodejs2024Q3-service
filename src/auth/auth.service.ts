import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(
      signupDto.password,
      Number(process.env.CRYPT_SALT),
    );
    return this.usersService.create({
      ...signupDto,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByLogin(loginDto.login);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = { userId: user.id, login: user.login };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
