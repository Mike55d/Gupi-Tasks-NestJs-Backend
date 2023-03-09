import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { execSync } from 'child_process';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';
import { ColumnsOrder } from './entities/columnsOrder.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column) private columnRepository: Repository<Column>,
    @InjectRepository(ColumnsOrder) private columnsOrderRepository: Repository<ColumnsOrder>,
  ) { }

  async create(createColumnDto: CreateColumnDto) {
    const column = this.columnRepository.create(createColumnDto);
    const newColumn = await this.columnRepository.save(column)
    const columnsOrder = await this.columnsOrderRepository.findOne({where:{}});
    if(columnsOrder){
      columnsOrder.orderColumns.push(newColumn._id);
      this.columnsOrderRepository.save(columnsOrder);
    }else{
      const newColumnsOrder = new ColumnsOrder();
      newColumnsOrder.orderColumns = [newColumn._id];
      this.columnsOrderRepository.save(newColumnsOrder);
    }
    execSync('sleep 1');// lets show loader
    return newColumn;
  }

  async changeOrder(order:string[]) {
    const parsedOrder = order.map( id => parseInt(id.split('-')[1]));
    const orderColumns = await this.columnsOrderRepository.findOne({where:{}});
    orderColumns.orderColumns = parsedOrder;
    this.columnsOrderRepository.save(orderColumns);
    // await this.columnsOrderModel.findOneAndUpdate({},{columnsOrder:order});
    return `order changed`;
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

  async remove(id: string) {
    const idColumn = parseInt(id.split('-')[1]);
    const column = await this.columnRepository.findOneBy({_id:idColumn});
    this.columnRepository.remove(column);
    const orderColumns = await this.columnsOrderRepository.findOne({where:{}});
    const index = orderColumns.orderColumns.findIndex(item => item == idColumn);
    orderColumns.orderColumns.splice(index,1);
    this.columnsOrderRepository.save(orderColumns);
    return;
  }
}
