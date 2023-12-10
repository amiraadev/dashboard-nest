import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signupLocal(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new NotFoundException(
        'This email is already in use. Please choose another.',
      );
    }

    const createdUser = await this.prisma.user.create({
      data: { ...dto },
    });
    return createdUser;
  }
  signinLocal() {}
  logout() {}
  refreshTokens() {}
}
