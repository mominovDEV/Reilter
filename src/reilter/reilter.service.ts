import { JwtPayload } from './types/jwt-payload.type';
import { CreateReilterDto } from './dto/create-reilter.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ReilterService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(
    createReilterDto: CreateReilterDto,
    res: Response,
  ): Promise<Tokens> {
    const candidate = await this.prismaService.reilter.findUnique({
      where: {
        email: createReilterDto.email,
      },
    });
    if (candidate) {
      throw new BadRequestException('Bund ay email mavjud');
    }
    const hashedPassword = await bcrypt.hash(createReilterDto.password, 7);

    const newUser = await this.prismaService.reilter.create({
      data: {
        email: createReilterDto.email,
        hashedPassword,
      },
    });

    const tokens = await this.getToken(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  // async signin(authdto: AuthDto, res: Response): Promise<Tokens> {
  //   const { email, password } = authdto;

  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     throw new BadRequestException('Bunday email mavjud');
  //   }
  //   const passwordMaches = await bcrypt.compare(password, user.hashedPassword);
  //   if (!passwordMaches) {
  //     throw new BadRequestException('Bunday email mavjud');
  //   }

  //   const tokens = await this.getToken(user.id, user.email);
  //   await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return tokens;
  // }

  async updateRefreshTokenHash(
    userId: number,
    refreshtoken: string,
  ): Promise<void> {
    const hashedRefreshtooken = await bcrypt.hash(refreshtoken, 7);
    await this.prismaService.reilter.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRefreshtooken,
      },
    });
  }

  async getToken(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accestoken, refreshtoken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accestoken,
      refresh_token: refreshtoken,
    };
  }

  // async refreshTokens(
  //   userId: number,
  //   refreshToken: string,
  //   res: Response,
  // ): Promise<Tokens> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   if (!user || !user.hashedRefreshToken)
  //     throw new ForbiddenException('Access Denied');

  //   const rtMatches = await bcrypt.compare(
  //     refreshToken,
  //     user.hashedRefreshToken,
  //   );
  //   if (!rtMatches) throw new ForbiddenException('Access Denied');

  //   const tokens = await this.getToken(user.id, user.email);
  //   await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return tokens;
  // }
}
