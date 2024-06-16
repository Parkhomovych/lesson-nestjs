import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDTO {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  userName?: string;
}
