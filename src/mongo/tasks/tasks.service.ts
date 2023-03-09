import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ColumnsOrder, ColumnsOrderDocument } from '../columns/schema/columnOrder.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Column, ColumnDocument } from './schema/column.schema';
import { Task, TaskDocument } from './schema/tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(ColumnsOrder.name) private columnsOrderModel: Model<ColumnsOrderDocument>,
    ) { }

  async create(request: { task: CreateTaskDto, columnId: string }) {

    const createdTask = new this.taskModel(request.task);
    const task = await createdTask.save();
    const column = await this.columnModel.findOne({ _id: request.columnId });
    const taskIds = column.taskIds;
    taskIds.push(task.id);
    await this.columnModel.updateOne({ _id: request.columnId }, { taskIds });
    return task;
  }

  async findAll() {
    const tasks = await this.taskModel.find();
    const columns = await this.columnModel.find();
    const orderColumns = await this.columnsOrderModel.findOne();
    const taskColumns = { tasks, columns, orderColumns:orderColumns.columnsOrder }
    return taskColumns;
  }

  async changeOrder(request) {
    const change = await this.columnModel.findOneAndUpdate({
      _id: request.columnId,
    }, { taskIds: request.newTaskIds });
    return change;
  }

  async changeColumn(request) {
    const oldColumn = await this.columnModel.findOne({ _id: request.columnId });
    const newColumn = await this.columnModel.findOne({ _id: request.columnIdDestiny });
    const newTaskIdsOldColumn = [...oldColumn.taskIds];
    newTaskIdsOldColumn.splice(oldColumn.taskIds.findIndex(item => item === request.taskId), 1)
    const newTaskIdsNewColumn = [...newColumn.taskIds];
    newTaskIdsNewColumn.splice(request.indexDestiny, 0, request.taskId);
    await this.columnModel.updateOne({ _id: request.columnId }, { taskIds: newTaskIdsOldColumn });
    await this.columnModel.updateOne({ _id: request.columnIdDestiny }, { taskIds: newTaskIdsNewColumn });
    return newTaskIdsNewColumn;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(request: { taskId: string, columnId: string }) {
    const task = await this.taskModel.findOne({_id:request.taskId});
    task.remove();
    const column = await this.columnModel.findOne({_id:request.columnId});
    const newTaskIds = [...column.taskIds];
    newTaskIds.splice(newTaskIds.findIndex(item => item === request.taskId),1);
    await this.columnModel.updateOne({ _id: request.columnId},{taskIds:newTaskIds});
    return `This action removes a #${request.taskId} task`;
  }
}
