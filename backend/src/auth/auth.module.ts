import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy,PrismaService],
})
export class AuthModule {}
