import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService): Promise<Tokens> {}
  @Post('/local/signup')
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto);
  }
  @Post('/local/signin')
  signinLocal() {
    this.authService.signinLocal;
  }
  @Post('/logout')
  logout() {
    this.authService.logout;
  }
  @Post('/refresh')
  refreshTokens() {
    this.authService.refreshTokens;
  }
}
