import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, DeleteTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeColumnDto, ChangeOrderDto } from './dto/change-position.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
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
  remove(@Body() request: DeleteTaskDto) {
    return this.tasksService.remove(request);
  }

  @Post('/changeOrder')
  changeOrder(@Body() request: ChangeOrderDto) {
    return this.tasksService.changeOrder(request);
  }

  @Post('/changeColumn')
  changeColumn(@Body() request: ChangeColumnDto) {
    return this.tasksService.changeColumn(request);
  }
}
