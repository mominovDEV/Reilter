import { PartialType } from '@nestjs/mapped-types';
import { CreateReilterDto } from './create-reilter.dto';

export class UpdateReilterDto extends PartialType(CreateReilterDto) {}
