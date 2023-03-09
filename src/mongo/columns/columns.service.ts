import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column, ColumnDocument } from '../tasks/schema/column.schema';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnsOrder, ColumnsOrderDocument } from './schema/columnOrder.schema';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(ColumnsOrder.name) private columnsOrderModel: Model<ColumnsOrderDocument>,
  ) { }

  async create(createColumnDto: CreateColumnDto) {
    const createdColumn = new this.columnModel(createColumnDto);
    const column = await createdColumn.save();
    const oderColumn = await this.columnsOrderModel.findOne();
    if (!oderColumn) {
      const createdOrderColumn = new this.columnsOrderModel({ columnsOrder: [column.id] });
      await createdOrderColumn.save();
    } else {
      oderColumn.columnsOrder.push(column.id)
      const updateOrderColumn = await this.columnsOrderModel.findOneAndUpdate({}, { columnsOrder: oderColumn.columnsOrder });
    }
    return column;
  }

  async changeOrder(order:string[]) {
    await this.columnsOrderModel.findOneAndUpdate({},{columnsOrder:order});
    return `order changed`;
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
    const oderColumn = await this.columnsOrderModel.findOne();
    const index = oderColumn.columnsOrder.findIndex(item => item == id);
    oderColumn.columnsOrder.splice(index,1);
    await this.columnsOrderModel.findOneAndUpdate({},{columnsOrder:oderColumn.columnsOrder});
    return `This action removes a #${id} column`;
  }
}
