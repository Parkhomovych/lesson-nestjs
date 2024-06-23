import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards';
import { DeleteUserDTO, UpdateUserDTO } from './dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Patch('update')
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateUser(@Body() dto: UpdateUserDTO, @Req() request) {
    const user = request.user;
    return this.userService.updateUser(user.email, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteUsers(@Body() dto: DeleteUserDTO) {
    return this.userService.deleteUser(dto);
  }
}
