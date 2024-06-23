import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDTO, UserLoginDTO } from './dto';
import { AuthUserResponse, RefreshTokenResponse } from './response';
import { JwtGuard } from 'src/guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  logout(@Req() request) {
    const user = request.user;
    return this.authService.logoutUser(user.email);
  }

  @UseGuards(JwtGuard)
  @Post('refresh-token')
  @ApiResponse({ status: 200, type: RefreshTokenResponse })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  refreshToken(@Body() dto: RefreshTokenDTO): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(dto);
  }
}
