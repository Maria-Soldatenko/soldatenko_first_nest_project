import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @AllowNull(false)
  @Column
  value: string;

  @AllowNull(false)
  @Default(false)
  @Column
  isCompleted: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
