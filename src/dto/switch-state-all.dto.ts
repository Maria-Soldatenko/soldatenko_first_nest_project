import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SwitchStateAll {
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
