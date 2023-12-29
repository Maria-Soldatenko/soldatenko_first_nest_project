import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';

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

  editProperties(
    task: Partial<Task>,
    id: number,
  ): Promise<[affectedCount: number, affectedRows: Task[]] | never> {
    return this.taskRepository
      .update(task, { where: { id: id }, returning: true })
      .then(
        (response) =>
          new Promise((resolve) => {
            if (response[0] !== 0) resolve(response);
            else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
          }),
      );
  }

  switchStateAll(task: Partial<Task>): void {
    this.taskRepository.update(task, {
      where: { isCompleted: !task.isCompleted },
      returning: true,
    });
  }

  deleteTask(id: number): void {
    this.taskRepository
      .destroy({ where: { id: id }, force: true })
      .then((response) => {
        if (response === 0)
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      });
  }

  deleteAllCompleted(): void {
    this.taskRepository.destroy({ where: { isCompleted: true }, force: true });
  }
}
