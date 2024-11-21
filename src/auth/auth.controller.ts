import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoggingService } from '../logging/logging.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async signup(@Body() signupDto: SignupDto) {
    this.loggingService.log(
      `User signing up: ${signupDto.login}`,
      'AuthController',
    );
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed. No user with such login, password',
  })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    this.loggingService.log(
      `User logged in: ${loginDto.login}`,
      'AuthController',
    );
    return token;
  }

  @Post('refresh')
  @ApiResponse({ status: 200, description: 'Token refreshed.' })
  @ApiResponse({ status: 401, description: 'Invalid token.' })
  @ApiResponse({ status: 403, description: 'Authentication failed.' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    this.loggingService.debug(
      `Token refreshed: ${refreshToken}`,
      'AuthController',
    );
    return this.authService.refresh(refreshToken);
  }
}
