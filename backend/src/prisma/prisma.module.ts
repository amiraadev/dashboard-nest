import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
})
export class PrismaModule {}
