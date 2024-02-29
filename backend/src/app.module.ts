import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SourceModule } from './files/source/source.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, PrismaModule, SourceModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
