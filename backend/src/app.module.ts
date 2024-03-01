import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, FilesModule],
  controllers: [],
  providers: [PrismaService,JwtService],
})
export class AppModule {}
