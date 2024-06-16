import { IsString, IsJWT, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserPasswordDTO {
  @ApiProperty({ required: true })
  @IsJWT()
  token: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  currentPassword: string;

  @ApiProperty({ required: true })
  @IsString()
  newPassword: string;
}
