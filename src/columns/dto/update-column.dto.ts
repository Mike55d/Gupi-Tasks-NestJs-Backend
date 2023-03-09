import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnDto } from './column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {}
