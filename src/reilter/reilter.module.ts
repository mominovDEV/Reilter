import { Module } from '@nestjs/common';
import { ReilterService } from './reilter.service';
import { ReilterController } from './reilter.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ReilterController],
  providers: [ReilterService],
})
export class ReilterModule {}
