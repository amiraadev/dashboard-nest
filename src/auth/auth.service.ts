import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
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
    const hash = await this.hashData(dto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },
    });
    return createdUser;
  }
  signinLocal() {}
  logout() {}
  refreshTokens() {}
}
