import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RefreshTokenResponse {
  @ApiProperty()
  @IsString()
  token: string;
}
