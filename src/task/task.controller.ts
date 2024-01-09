import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTaskDto } from '../dto/create-task.dto';
import { EditPropertiesDto } from '../dto/edit-properties.dto';
import { SwitchStateAll } from '../dto/switch-state-all.dto';

import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  @Patch('/edit/:id')
  editProperties(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditPropertiesDto,
  ) {
    return this.taskService.editProperties(data, id);
  }

  @Patch()
  switchStateAll(@Body() data: SwitchStateAll) {
    return this.taskService.switchStateAll(data);
  }

  @Delete('/specific/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }

  @Delete('/completed')
  deleteAllCompleted() {
    return this.taskService.deleteAllCompleted();
  }
}
