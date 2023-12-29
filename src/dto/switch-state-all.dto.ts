import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class SwitchStateAll {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
