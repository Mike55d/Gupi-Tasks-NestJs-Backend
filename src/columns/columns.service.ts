import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column, ColumnDocument } from 'src/tasks/schema/column.schema';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
  ) { }

  async create(createColumnDto: CreateColumnDto) {
    const createdColumn = new this.columnModel(createColumnDto);
    const column = await createdColumn.save();
    return column;
  }

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  async remove(id: string) {
    const column = await this.columnModel.findOne({ _id: id });
    column.remove();
    return `This action removes a #${id} column`;
  }
}
