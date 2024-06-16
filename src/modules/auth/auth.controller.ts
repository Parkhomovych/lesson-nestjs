import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { JwtGuard } from 'src/guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtGuard)
  @Post('test')
  test() {
    return true;
  }

  @ApiResponse({ status: 200 })
  @Post('logout')
  logout() {
    return this.authService.logoutUser();
  }
}
