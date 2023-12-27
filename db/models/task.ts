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

  @Default(false)
  @Column
  isCompleted: boolean;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
