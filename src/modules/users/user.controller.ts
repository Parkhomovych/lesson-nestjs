import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    console.log(dto);

    return this.userService.createUser(dto);
  }

  @Put('update-user')
  updateUser() {
    return this.userService.updateUser();
  }

  @Delete('delete')
  deleteUsers() {
    return this.userService.deleteUser();
  }
}
