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
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { EditPropertiesDto } from 'src/dto/edit-properties.dto';
import { SwitchStateAll } from 'src/dto/switch-state-all.dto';

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

  @Patch(':id')
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

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }

  @Delete()
  deleteAllCompleted() {
    return this.taskService.deleteAllCompleted();
  }
}
