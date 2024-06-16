import { IsString, IsOptional, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDTO {
  @ApiProperty({ required: true })
  @IsJWT()
  token: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
