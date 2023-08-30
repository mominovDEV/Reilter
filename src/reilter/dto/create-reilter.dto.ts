import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateReilterDto {
  name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  isactive: boolean;

  iscreator: boolean;
}
