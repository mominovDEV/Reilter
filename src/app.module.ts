import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReilterModule } from './reilter/reilter.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReilterModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
