import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from 'src/columns/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Column) private columnRepository: Repository<Column>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);
    const task = await this.tasksRepository.save(newTask);
    const column = await this.columnRepository.findOneBy({ _id: createTaskDto.columnId });
    column.taskIds.push(task._id);
    this.columnRepository.save(column);
    return task;
  }

  async findAll() {
    const tasks = await (await this.tasksRepository.find()).map(task => ({...task,_id:`t-${task._id}`}));
    const columns = await (await this.columnRepository.find()).map(column => ({
      ...column,
      _id:`c-${column._id}`,
      taskIds: column.taskIds.map(id => `t-${id}`)
    }));
    const taskColumns = { tasks, columns, orderColumns: ["c-1","c-2"] };
    return taskColumns;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
