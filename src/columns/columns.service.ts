import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';
import { ColumnsOrder } from './entities/columnsOrder.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column) private tasksRepository: Repository<Column>,
    @InjectRepository(ColumnsOrder) private columnsOrderRepository: Repository<ColumnsOrder>,
  ) { }

  async create(createColumnDto: CreateColumnDto) {
    const column = this.tasksRepository.create(createColumnDto);
    const newColumn = await this.tasksRepository.save(column)
    const columnsOrder = await this.columnsOrderRepository.findOne({where:{}});
    if(columnsOrder){
      columnsOrder.orderColumns.push(newColumn._id);
      this.columnsOrderRepository.save(columnsOrder);
    }else{
      const newColumnsOrder = new ColumnsOrder();
      newColumnsOrder.orderColumns = [newColumn._id];
      this.columnsOrderRepository.save(newColumnsOrder);
    }
    return newColumn;
  }

  async findAll() {
    return `this action return all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
