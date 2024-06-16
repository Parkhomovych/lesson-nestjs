import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class AuthUserResponse {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  token: string;
}
