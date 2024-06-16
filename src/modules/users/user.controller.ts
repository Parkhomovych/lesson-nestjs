import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards';
import { UpdateUserDTO } from './dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Patch('update')
  updateUser(@Body() dto: UpdateUserDTO, @Req() request) {
    const user = request.user;
    return this.userService.updateUser(user.email, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  deleteUsers() {
    return this.userService.deleteUser();
  }
}
