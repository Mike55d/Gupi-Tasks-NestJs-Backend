import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from 'src/columns/entities/column.entity';
import { ColumnsOrder } from 'src/columns/entities/columnsOrder.entity';
import { Repository } from 'typeorm';
import { ChangeColumnDto, ChangeOrderDto } from './dto/change-position.dto';
import { CreateTaskDto, DeleteTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Column) private columnRepository: Repository<Column>,
    @InjectRepository(ColumnsOrder) private columnsOrderRepository: Repository<ColumnsOrder>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto.task);
    const task = await this.tasksRepository.save(newTask);
    const column = await this.columnRepository.findOneBy({ _id: createTaskDto.columnId });
    column.taskIds.push(task._id);
    this.columnRepository.save(column);
    return task;
  }

  async findAll() {
    const tasks = (await this.tasksRepository.find()).map(task => ({ ...task, _id: `t-${task._id}` }));
    const columns = (await this.columnRepository.find()).map(column => ({
      ...column,
      _id: `c-${column._id}`,
      taskIds: column.taskIds.map(id => `t-${id}`)
    }));
    const columnsOrder = (await this.columnsOrderRepository.findOne({ where: {} }))
    const taskColumns = { tasks, columns, orderColumns: columnsOrder.orderColumns.map(id => `c-${id}`) };
    return taskColumns;
  }

  async changeOrder(request:ChangeOrderDto) {
    const column = await this.columnRepository.findOneBy({_id:request.columnId});
    column.taskIds = request.newTaskIds;
    this.columnRepository.save(column);
    return column;
  }

  async changeColumn(request:ChangeColumnDto) {
    const oldColumn =  await this.columnRepository.findOneBy({_id:request.columnId});
    oldColumn.taskIds.splice(oldColumn.taskIds.findIndex(item => item === request.taskId), 1);
    this.columnRepository.save(oldColumn);
    const newColumn = await this.columnRepository.findOneBy({_id:request.columnIdDestiny});
    newColumn.taskIds.splice(request.indexDestiny, 0, request.taskId);
    this.columnRepository.save(newColumn);
    return;
  }


  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(request: DeleteTaskDto) {
    const task = await this.tasksRepository.findOneBy({_id: request.taskId})
    this.tasksRepository.remove(task);
    const column = await this.columnRepository.findOneBy({_id:request.columnId});
    column.taskIds.splice(column.taskIds.findIndex( item => item === request.taskId),1);
    this.columnRepository.save(column);
    return `This action removes a #${request.taskId} task`;
  }
}
