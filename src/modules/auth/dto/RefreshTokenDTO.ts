import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RefreshTokenDTO {
  @ApiProperty({ required: true })
  @IsString()
  refreshToken: string;
}
