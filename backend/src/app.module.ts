import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, FilesModule, UserModule],
  controllers: [],
  providers: [PrismaService,JwtService],
})
export class AppModule {}
