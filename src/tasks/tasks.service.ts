import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from 'src/columns/entities/column.entity';
import { ColumnsOrder } from 'src/columns/entities/columnsOrder.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
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
    const idColumn = parseInt(createTaskDto.columnId.split('-')[1]);
    const column = await this.columnRepository.findOneBy({ _id: idColumn });
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

  async changeOrder(request) {
    const idColumn = parseInt(request.columnId.split('-')[1]);
    const parsedTaskIds = request.newTaskIds.map(id => parseInt(id.split('-')[1]));
    const column = await this.columnRepository.findOneBy({_id:idColumn});
    column.taskIds = parsedTaskIds;
    this.columnRepository.save(column);
    return column;
  }

  async changeColumn(request) {
    const taskId = parseInt(request.taskId.split('-')[1]);
    const idColumn = parseInt(request.columnId.split('-')[1]);
    const idColumnDestiny = parseInt(request.columnIdDestiny.split('-')[1]);
    const oldColumn =  await this.columnRepository.findOneBy({_id:idColumn});
    oldColumn.taskIds.splice(oldColumn.taskIds.findIndex(item => item === taskId), 1);
    this.columnRepository.save(oldColumn);
    const newColumn = await this.columnRepository.findOneBy({_id:idColumnDestiny});
    newColumn.taskIds.splice(request.indexDestiny, 0, taskId);
    this.columnRepository.save(newColumn);
    return;
  }


  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(request: { taskId: string, columnId: string }) {
    const idTask = parseInt(request.taskId.split('-')[1]);
    const idColumn = parseInt(request.columnId.split('-')[1]);
    const task = await this.tasksRepository.findOneBy({_id: idTask})
    this.tasksRepository.remove(task);
    const column = await this.columnRepository.findOneBy({_id:idColumn});
    column.taskIds.splice(column.taskIds.findIndex( item => item === idTask),1);
    this.columnRepository.save(column);
    return `This action removes a #${request.taskId} task`;
  }
}
