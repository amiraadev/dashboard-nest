import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthModule, FilesModule,PrismaService],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
