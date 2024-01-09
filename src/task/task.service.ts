import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  createTask(task: Partial<Task>): Promise<Task> {
    return this.taskRepository.create(task);
  }

  async editProperties(task: Partial<Task>, id: number): Promise<Task | never> {
    const [affectedCount, [affectedTask]] = await this.taskRepository.update(
      task,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedCount === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return affectedTask;
  }

  switchStateAll(task: Partial<Task>): void {
    this.taskRepository.update(task, {
      where: { isCompleted: !task.isCompleted },
    });
  }

  async deleteTask(id: number): Promise<void> {
    const affectedCount = await this.taskRepository.destroy({
      where: { id },
    });

    if (affectedCount === 0)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteAllCompleted(): void {
    this.taskRepository.destroy({ where: { isCompleted: true } });
  }
}
