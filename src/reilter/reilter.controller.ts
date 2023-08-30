import { CreateReilterDto } from './dto/create-reilter.dto';
import { Tokens } from './types/tokens.types';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ReilterService } from './reilter.service';

@Controller('reilter')
export class ReilterController {
  constructor(private readonly reilterService: ReilterService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() createReilterDto: CreateReilterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.reilterService.signup(createReilterDto, res);
  }

  // @Public()
  // @Post('signin')
  // @HttpCode(HttpStatus.OK)
  // async signin(
  //   @Body() authDto: AuthDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Tokens> {
  //   return this.authService.signin(authDto, res);
  // }

  // @Post('signout')
  // @HttpCode(HttpStatus.OK)
  // async signout(
  //   @GetCorrentUserId() userid: number,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<boolean> {
  //   return this.authService.signout(userid, res);
  // }

  // @Public()
  // @Post('refresh')
  // @UseGuards(RefreshTokenGuard)
  // @HttpCode(HttpStatus.OK)
  // async refreshToken(
  //   @GetCorrentUserId() userid: number,
  //   @GetCorrentUser('refreshToken') refreshToken: string,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Tokens> {
  //   return this.authService.refreshTokens(userid, refreshToken, res);
  // }
}
