import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('mongo/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() request: { task: CreateTaskDto, columnId: string }) {
    return this.tasksService.create(request);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete()
  remove(@Body() request: { taskId: string, columnId: string }) {
    return this.tasksService.remove(request);
  }

  @Post('/changeOrder')
  changeOrder(@Body() request) {
    return this.tasksService.changeOrder(request);
  }

  @Post('/changeColumn')
  changeColumn(@Body() request) {
    return this.tasksService.changeColumn(request);
  }
}
