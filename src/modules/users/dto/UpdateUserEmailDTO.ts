import { IsString, IsEmail, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserEmailDTO {
  @ApiProperty({ required: true })
  @IsJWT()
  token: string;

  @ApiProperty({ required: true })
  @IsEmail()
  currentEmail: string;

  @ApiProperty({ required: true })
  @IsEmail()
  newEmail: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
