import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common/decorators/guards';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: number) {
    console.log('gdfr');

    // return this.authService.logout(userId);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
