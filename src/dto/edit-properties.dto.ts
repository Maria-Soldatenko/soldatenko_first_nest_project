import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditPropertiesDto {
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  value: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
